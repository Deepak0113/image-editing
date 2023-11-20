import { useState } from "react"

const usePopupNotification = () => {
    const [showPopupNotification, setShowPopupNotification] = useState<boolean>(false);
    const [notificationContent, setNotificationContent] = useState<string>('');
    const POPUP_TIME_MS = 5000;

    // open notification toggle
    const openPopupNotification = (content: string) => {
        setShowPopupNotification(true);
        setNotificationContent(content);

        setTimeout(() => {
            setShowPopupNotification(false);
            setNotificationContent('');
        }, POPUP_TIME_MS);
    }

    return {
        openPopupNotification,
        notification: <div>{notificationContent}</div>
    }
}

export default usePopupNotification;