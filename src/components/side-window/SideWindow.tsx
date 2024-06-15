import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { selectFirstTimeOpen, selectSideWindowIsOpen } from "../../selectors";
import { TOGGLE_SIDE_WINDOW } from "../../actions";
import { navigationLinks } from "./links";

import { Overlay, List } from "./styles";
import { Dispatch } from "redux";

const SideWindowContainer: React.FC<{ className?: string }> = ({ className }) => {
	const sideWindowIsOpen: boolean = useSelector(selectSideWindowIsOpen);
	const firstTimeOpen: boolean = useSelector(selectFirstTimeOpen);

	const dispatch: Dispatch = useDispatch();

	const overlayRef = useRef<HTMLDivElement>(null);
	const windowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sideWindowIsOpen) {
			const timerId = setTimeout(() => {
				if (overlayRef.current && windowRef.current) {
					overlayRef.current.style.visibility = "hidden";
					windowRef.current.style.visibility = "hidden";
				}
			}, 500);

			return () => clearTimeout(timerId);
		}
	}, [sideWindowIsOpen]);

	const animationStyles: React.CSSProperties = {
		animationName: sideWindowIsOpen ? "fadeInLeft" : "fadeOutLeft",
		opacity: sideWindowIsOpen ? "1" : "0",
		visibility: sideWindowIsOpen ? "visible" : firstTimeOpen ? "hidden" : "initial",
	};

	return (
		<>
			<Overlay style={animationStyles} ref={overlayRef}></Overlay>
			<aside className={className} style={animationStyles} ref={windowRef}>
				<List>
					{navigationLinks.map((link, i) => (
						<React.Fragment key={i}>
							<Link
								className="item"
								to={link.to}
								onClick={() => dispatch(TOGGLE_SIDE_WINDOW)}
							>
								<div>{link.label}</div>
								<div className="underline"></div>
							</Link>
							{link.hr && <hr />}
						</React.Fragment>
					))}
				</List>
			</aside>
		</>
	);
};

const SideWindow = styled(SideWindowContainer)`
	position: fixed;
	top: 0;
	padding: 80px 10px;
	display: flex;
	align-items: center;
	width: 300px;
	height: 100%;
	border: 1px solid black;
	border-top: none;
	animation-duration: 500ms;
	z-index: 10;
	background: #fff;

	& hr {
		margin: 20px 0;
	}

	& .item {
		font-size: 23px;
		padding: 5px;
		transition: 500ms;
		position: relative;
		display: block;
	}

	.underline {
		position: absolute;
		bottom: 3px;
		left: 4px;
		width: 110px;
		height: 2px;
		background-color: #000;
		transform: scale(0);
		transition: transform 0.3s ease;
	}

	.item:hover .underline {
		transform: scale(1);
	}
`;

export default SideWindow;
