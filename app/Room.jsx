"use client";

import { db } from "@/config/firebaseConfig";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";

export function Room({ children, params }) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth?roomId="+params?.documentid}
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db,'Users'), where(
          'email', 'in'
, userIds))

          const querySnapshot = await getDocs(q);

          let userList=[];

          querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            userList.push(doc.data());
          })
        return userList;
      }}

        resolveMentionSuggestions={async ({ text, roomId }) => {
          const q = query(collection(db,'Users'), where(
          'email', '!=', null))

          const querySnapshot = await getDocs(q);

          let userList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userList.push({
      id: data.email,
      name: data.name || data.email, // fallback to email
      avatar: data.avatar || "",
    });
  });

  if (text) {
    userList = userList.filter((user) =>
      (user.name || user.id).toLowerCase().includes(text.toLowerCase())
    );
  }

  console.log("Resolved mentions:", userList);
  return userList.map((user) => user.id);

        }}

    >
      <RoomProvider id={params?.documentid}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
