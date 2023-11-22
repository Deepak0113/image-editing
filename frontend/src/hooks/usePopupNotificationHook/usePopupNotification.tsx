import { useState } from "react"
import './usePopupNotification.css'

const usePopupNotification = () => {
    const [showPopupNotification, setShowPopupNotification] = useState<boolean>(false);
    const [notificationContent, setNotificationContent] = useState<string>('');
    const POPUP_TIME_MS = 2000;

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
        notification: (showPopupNotification ? <div className="notification__popup">{notificationContent}</div> : <></>)
    }
}

export default usePopupNotification;