import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

import { Spinner } from "../spinner/Spinner";
import { RecordItem } from "../recordItem/RecordItem";
import { NoData } from "../no-data/NoData";

import { Divider, ButtonWindow, ButtonWrapper } from "./styles";
import { ArrowIcon } from "../../icons";
import { Account, Record } from "../../types/types";

interface WindowProps {
	className?: string;
	title: string;
	items: Record[] | Account[] | null;
	isLoading: boolean;
}

const WindowContainer: React.FC<WindowProps> = ({ className, title, items, isLoading }) => {
	return (
		<article className={className}>
			<Link to={`/${title.toLowerCase()}`} className="title">
				<div>{title}</div>
				<ArrowIcon />
			</Link>
			<Divider type={title} />

			{!isLoading ? (
				<>
					{items && items.length > 0 ? (
						<div className="wrapper">
							{items.map((item, id) => (
								<React.Fragment key={id}>
									{title === "Accounts" ? (
										<RecordItem item={item} type={title} />
									) : (
										<Link to={`/record/${item.id}`}>
											<RecordItem item={item} type={title} />
										</Link>
									)}
								</React.Fragment>
							))}
						</div>
					) : (
						<NoData
							mainText={`No ${title}`}
							emptyText={`You haven't added any 
                                ${title.toLowerCase().slice(0, -1)} yet`}
						/>
					)}
					<ButtonWrapper>
						<Link to={`/add-${title.toLowerCase()}`}>
							<ButtonWindow type={title}>+</ButtonWindow>
						</Link>
					</ButtonWrapper>
				</>
			) : (
				<Spinner />
			)}
		</article>
	);
};

export const Window = styled(WindowContainer)`
	border: 2px solid #000;
	border-radius: 7px;
	position: relative;
	overflow: hidden;
	padding: 5px 5px 40px 5px;
	background: #fff;

	& .title {
		display: flex;
		text-transform: capitalize;
		justify-content: center;
		align-items: center;
		column-gap: 10px;
		text-align: center;
		font-size: 20px;
		transition: 0.2s all;
		cursor: auto;

		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}

	& .spinner {
		transform: translateY(70px);
	}
`;
