import { useEffect, useState } from "react";

export const useShowMessage = () => {
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMessageVisible(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [isMessageVisible]);

    return { isMessageVisible, setIsMessageVisible };
};
