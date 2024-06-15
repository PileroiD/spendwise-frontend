import styled from "styled-components";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

import { IconComponent } from "../../icon-component/IconComponent";

import { PencilIcon } from "../../../icons";
import { AccountName, selectAccountNames } from "../../../selectors";

interface RecordInfoProps {
	className?: string;
	label: "Title" | "Account" | "Amount" | "Type" | "Description" | "Icon" | "Image";
	value: string | React.ReactNode;
	isInput: boolean;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	mainRef: React.MutableRefObject<HTMLDivElement | null>;
	type: string;
}

const RecordInfoContainer = forwardRef<HTMLDivElement, RecordInfoProps>(
	({ className, label, value, isInput, inputValue, setInputValue, mainRef, type }, ref) => {
		const accountNames: AccountName[] = useSelector(selectAccountNames);
		const types: string[] = ["Incomes", "Expenses"];

		const selectMap: AccountName[] | typeof types = label === "Type" ? types : accountNames;

		const openInput = (): void => {
			if (mainRef.current) {
				mainRef.current.style.display = "flex";
			}
		};

		const closeInput = (): void => {
			if (mainRef.current) {
				mainRef.current.style.display = "none";
				setInputValue("");
			}
		};

		if (label === "Description" || label === "Icon") {
			return (
				<React.Fragment>
					<div className="items-wrapper">
						<h3>{label}: </h3>
						<IconComponent>
							<div onClick={() => openInput()}>
								<PencilIcon />
							</div>
						</IconComponent>
					</div>
					<div className="items-info">
						{value ? value : <div style={{ color: "#808080" }}>No description</div>}
					</div>
					<div className="input" ref={mainRef} data-event={"descr"}>
						<textarea
							placeholder={`New ${label.toLowerCase()}...`}
							value={inputValue}
							style={{
								height: "100px",
							}}
							onChange={({ target }) => setInputValue(target.value)}
						/>
						<div onClick={closeInput} className="close">
							&times;
						</div>
					</div>
				</React.Fragment>
			);
		}

		return (
			<div className={className} ref={ref}>
				<div className={label.toLowerCase()}>{label}: </div>
				<h3>{value}</h3>
				<IconComponent>
					<div onClick={openInput}>
						<PencilIcon />
					</div>
				</IconComponent>
				{isInput ? (
					<div className={type} ref={mainRef}>
						<input
							type={label === "Amount" ? "number" : "text"}
							placeholder={`New ${label.toLowerCase()}...`}
							value={inputValue}
							onChange={({ target }) => setInputValue(target.value)}
						/>
						<div onClick={closeInput} className="close">
							&times;
						</div>
					</div>
				) : (
					<div className={type} ref={mainRef}>
						<select
							value={inputValue}
							onChange={({ target }) => setInputValue(target.value)}
						>
							{selectMap?.map((value, i) => (
								<option
									key={i}
									value={typeof value === "object" ? value.accountName : value}
								>
									{typeof value === "object" ? value.accountName : value}
								</option>
							))}
						</select>
						<div onClick={() => closeInput()} className="close">
							&times;
						</div>
					</div>
				)}
			</div>
		);
	}
);

export const RecordInfo = styled(RecordInfoContainer)<RecordInfoProps>`
	display: flex;
	align-items: center;
	column-gap: 10px;
	margin-bottom: 10px;
`;
