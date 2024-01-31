import React, { useEffect, useState } from "react";
import NotificationsService, { INotifications } from "../services/NotificationService";

export const Notifications = () => {
  const notificationsService = new NotificationsService();
  const [notifs, setNotifs] = useState<INotifications | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await notificationsService.get();
        if (data === false || data === null) {
          return;
        }
        setNotifs(data);
      } catch (error) {
        console.error('Error during fetching feed:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="flex items-center justify-between shadow-xl rounded p-4 w-full bg-[#191919] mb-2">
        Notifications
        <button onClick={() => setShow(!show)}>
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
      {notifs && show &&
        notifs.slice(-3).map((notification) => (
          <div
            className="shadow-xl rounded p-2 w-full bg-[#191919] mb-2"
            key={notification.id}
            dangerouslySetInnerHTML={{ __html: notification.content }}
          />
        ))}
    </div>
  )
}