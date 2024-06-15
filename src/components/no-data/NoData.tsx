import React from "react";
import styled from "styled-components";

const MainText = styled.div`
	font-size: 30px;
	color: #808080;
	margin-top: 50px;
`;

const EmptyText = styled.div`
	color: #808080;
`;

interface NoDataContainerProps {
	className?: string;
	mainText: string;
	emptyText?: string;
}

const NoDataContainer: React.FC<NoDataContainerProps> = ({ className, mainText, emptyText }) => {
	return (
		<div className={className}>
			<MainText>{mainText}</MainText>
			<EmptyText>{emptyText}</EmptyText>
		</div>
	);
};

export const NoData = styled(NoDataContainer)<NoDataContainerProps>`
	text-align: center;
`;
