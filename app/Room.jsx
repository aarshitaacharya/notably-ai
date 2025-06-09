"use client";

import { db } from "@/config/firebaseConfig";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";

export function Room({ children, params }) {
  const roomId = params?.documentid;

  if (!roomId) {
    return <div>Error: Missing room ID</div>;
  }

  return (
    <LiveblocksProvider
      authEndpoint={`/api/liveblocks-auth?roomId=${roomId}`}
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db, "Users"), where("email", "in", userIds));
        const querySnapshot = await getDocs(q);

        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });

        return userList;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const q = query(collection(db, "Users"), where("email", "!=", null));
        const querySnapshot = await getDocs(q);

        let userList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userList.push({
            id: data.email,
            name: data.name || data.email,
            avatar: data.avatar || "",
          });
        });

        if (text) {
          userList = userList.filter((user) =>
            (user.name || user.id).toLowerCase().includes(text.toLowerCase())
          );
        }

        return userList.map((user) => user.id);
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
