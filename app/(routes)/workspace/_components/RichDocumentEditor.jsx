"use client"
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import GenerateAITemplate from './GenerateAITemplate'

const CLIENT_ID = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const isFetchedRef = useRef(false);
  const { user } = useUser();

  const SaveDocument = async () => {
    try {
      const data = await editorRef.current?.save();
      const docRef = doc(db, 'documentOutput', params?.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(data),
        editedBy: user?.primaryEmailAddress?.emailAddress,
        clientId: CLIENT_ID,
      });
      console.log("Saved document");
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const InitEditor = () => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: 'editorjs',
      onChange: () => SaveDocument(),
      onReady: () => {
        console.log('Editor is ready');
      },
      tools: {
        header: Header,
        delimiter: Delimiter,
        paragraph: Paragraph,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
            defaultType: 'primary',
            messagePlaceholder: 'Enter something',
          }
        },
        table: Table,
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
          config: {
            defaultStyle: 'unordered'
          },
        },
        checklist: {
          class: Checklist,
          shortcut: 'CMD+SHIFT+C',
          inlineToolbar: true,
        },
        image: SimpleImage,
        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+P'
        }
      }
    });

    editorRef.current = editor;
  };

  useEffect(() => {
  if (user && params?.documentid) {
    InitEditor();
  }
}, [user, params?.documentid]);


  useEffect(() => {
    if (!user || !params?.documentid) return;

    const docRef = doc(db, 'documentOutput', params.documentid.toString());
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const data = docSnap.data();
      if (!data) return;

      const isOtherClient = data?.clientId !== CLIENT_ID;
      const isFirstLoad = !isFetchedRef.current;

      if ((isOtherClient || isFirstLoad) && editorRef.current) {
        const parsedOutput = typeof data.output === 'string' ? JSON.parse(data.output) : data.output;

        editorRef.current.isReady
          .then(() => {
            editorRef.current.render(parsedOutput);
            isFetchedRef.current = true;
            console.log("Rendered update from Firestore");
          })
          .catch((err) => {
            console.error("Editor not ready:", err);
          });
      }



    });

    return () => unsubscribe(); 
  }, [user, params?.documentid]);

  return (
    <div className="pl-40">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
      <GenerateAITemplate
      setGenerateAIOutput={async (output) => {
          await editorRef.current?.render(output);
          SaveDocument();
        }}
      />

      </div>
    </div>
  );
}

export default RichDocumentEditor;
