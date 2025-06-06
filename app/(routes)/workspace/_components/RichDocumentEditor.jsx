"use client"
import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert'
import Paragraph from '@editorjs/paragraph';
import List from "@editorjs/list";
import Table from '@editorjs/table'
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist'
import CodeTool from '@editorjs/code';


function RichDocumentEditor() {
    const ref = useRef();
    let editor;

    useEffect(()=>{
        InitEditor();
    },[])

    const InitEditor = () => {
        if(!editor?.current){
            editor = new EditorJS({
                holder: 'editorjs',
                 tools: {
                    header: Header,
                    delimiter: Delimiter,
                    paragraph:Paragraph,
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
                    //   textVariant: TextVariantTune


                    },

                });
                ref.current = editor;
                }
            }

  return (
    <div className="-ml-5">
        <div id = "editorjs"></div>
    </div>

  )
}

export default RichDocumentEditor