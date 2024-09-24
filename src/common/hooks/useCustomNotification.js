import { notification } from 'antd';

const useCustomNotification = () => {
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    return {
        openNotificationWithIcon,
    };
};

export default useCustomNotification;