import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { TOGGLE_SIDE_WINDOW } from "../../actions";
import { FIRST_OPEN } from "../../actions/set-first-open";
import { selectSideWindowIsOpen } from "../../selectors";

const Span = styled.span`
    display: block;
    width: 30px;
    height: 3px;
    background: #000;
    margin: 4px 0;
    border-radius: 5px;
    transition: 200ms;
`;

const HamburgerContainer = ({ className, isHidden }) => {
    const sideWindowIsOpen = useSelector(selectSideWindowIsOpen);
    const dispatch = useDispatch();

    return (
        <div
            className={className}
            style={{ visibility: isHidden ? "hidden" : "visible" }}
        >
            <div
                className={`hamburger ${sideWindowIsOpen ? "active" : null}`}
                onClick={() => {
                    dispatch(TOGGLE_SIDE_WINDOW);
                    dispatch(FIRST_OPEN);
                }}
            >
                <Span className="span-1"></Span>
                <Span className="span-2"></Span>
                <Span className="span-3"></Span>
            </div>
        </div>
    );
};

export const Hamburger = styled(HamburgerContainer)`
    width: 33%;

    .hamburger {
        cursor: pointer;
        width: 30px;
        padding: 5px;
    }

    .hamburger.active {
        .span-1 {
            transform: rotate(45deg) translateY(10px);
        }

        .span-2 {
            transform: translateX(-30px);
            opacity: 0;
        }

        .span-3 {
            transform: rotate(-45deg) translateY(-10px);
        }
    }
`;
