"use client";

import React, { use } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

function WorkspaceDocument({ params }) {
  console.log("params:", params);
  console.log("is promise:", typeof params?.then === "function");

  // Optional: Unwrap only if it's a promise
  const actualParams = typeof params?.then === "function" ? use(params) : params;

  return (
    <Room params={actualParams}>
      <div className="flex">
        <SideNav params={actualParams} />
        <div className="flex-grow md:ml-72">
          <DocumentEditorSection params={actualParams} />
        </div>
      </div>
    </Room>
  );
}

export default WorkspaceDocument;
