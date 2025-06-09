"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useRoom,
  useUnreadInboxNotificationsCount,
  useUpdateRoomSubscriptionSettings,
} from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";

function NotificationBoxWrapper({ children }) {
  try {
    return <NotificationBox children={children} />;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("NotificationBox used outside Liveblocks provider");
    }
    return null; // or return a minimal fallback
  }
}


function NotificationBox({ children }) {
  const inboxNotifications = useInboxNotifications().inboxNotifications || [];
  const updateRoomSubscriptionSettings = useUpdateRoomSubscriptionSettings();
  const { count = 0 } = useUnreadInboxNotificationsCount();

  const { isStorageLoading } = useRoom();

  useEffect(() => {
    if (!isStorageLoading) {
      updateRoomSubscriptionSettings({ threads: "all" });
    }
  }, [isStorageLoading]);



  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1">
          {children}
          <span className="p-1 px-2 -ml-3 rounded-full text-[7px] bg-primary text-white">
            {count}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-[500px]"}>
        <InboxNotificationList>
          {inboxNotifications.map((inboxNotification) => (
            <InboxNotification
              key={inboxNotification.id}
              inboxNotification={inboxNotification}
            />
          ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationBox;
