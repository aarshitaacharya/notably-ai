"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function WorkspaceRedirectPage({ params }) {
  const router = useRouter();

  useEffect(() => {
    async function redirectToFirstDoc() {
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", Number(params.workspaceid))
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const firstDoc = snapshot.docs[0];
        router.replace(`/workspace/${params.workspaceid}/${firstDoc.id}`);
      } else {
        // No documents in workspace: Optional placeholder UI
        console.warn("No documents found in this workspace.");
      }
    }

    redirectToFirstDoc();
  }, [params.workspaceid, router]);

  return <div className="p-6 text-gray-500">Loading workspace...</div>;
}
