"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist'
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const isFetched = useRef(false);
  const { user } = useUser();

  const SaveDocument = () => {
    console.log("UPDATE")
    editorRef.current?.save().then(async (outputData) => {
      const docRef = doc(db, 'documentOutput', params?.documentid);
      await updateDoc(docRef, {
        output: outputData,
        editedBy: user?.primaryEmailAddress?.emailAddress
      });
    });
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid),
      (docSnap) => {
        const output = docSnap.data()?.output;
        const isMe = docSnap.data()?.editedBy === user?.primaryEmailAddress?.emailAddress;
        if (!isMe || !isFetched.current) {
          if (editorRef.current && output) {
            editorRef.current.render(docSnap.data().output);
            isFetched.current = true;
          }
        }
      });
    return unsubscribe;
  };

  const InitEditor = () => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        onChange: () => SaveDocument(),
        onReady: () => GetDocumentOutput(),
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
          },
        }
      });

      editorRef.current = editor;
    }
  };

  useEffect(() => {
    if (user) InitEditor();
  }, [user]);

  return (
    <div className='px-40'>
      <div id='editorjs' className='w-[70%]'></div>
    </div>
  );
}

export default RichDocumentEditor;
