import { useEffect, useState } from "react";

export interface ShowMessage {
	isMessageVisible: boolean;
	setIsMessageVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useShowMessage = (): ShowMessage => {
	const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsMessageVisible(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [isMessageVisible]);

	return { isMessageVisible, setIsMessageVisible };
};
