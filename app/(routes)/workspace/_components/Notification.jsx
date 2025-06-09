"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
  useUpdateRoomNotificationSettings,
} from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";

// Utility: Check if we're inside a Liveblocks context
function useSafeLiveblocksHook(hook, fallback = undefined) {
  try {
    return hook();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Liveblocks hook used outside of provider:", hook.name);
    }
    return fallback;
  }
}

function NotificationBox({ children }) {
  // use safe wrappers to prevent crashing if not in provider
  const inboxNotifications =
    useSafeLiveblocksHook(useInboxNotifications, { inboxNotifications: [] })
      .inboxNotifications || [];
  const updateRoomNotificationSettings = useSafeLiveblocksHook(
    useUpdateRoomNotificationSettings,
    () => () => {}
  );
  const { count = 0, error, isLoading } =
    useSafeLiveblocksHook(useUnreadInboxNotificationsCount, {
      count: 0,
      error: null,
      isLoading: false,
    });

  useEffect(() => {
    updateRoomNotificationSettings({ threads: "all" });
  }, [count]);

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
