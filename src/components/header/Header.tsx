import styled from "styled-components";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import { Button } from "../button-component/Button";
import { Hamburger } from "../hamburger/Hamburger";

import { request } from "../../utils/index";
import { setUser } from "../../actions/index";
import { initialUserState } from "../../reducers/index";
import { selectUserId, selectUserEmail } from "../../selectors/index";
import { ThemeComponent } from "../theme-component/Theme";

interface LogoutResponse {
	error: null | string;
	success: boolean;
}

const Logo = styled.div`
	width: 33%;
	text-align: center;

	& > a {
		font-family: "Playfair Display", serif;
		font-style: italic;
		font-size: 30px;
		line-height: 25px;
	}
`;

const AuthButtons = styled.div`
	width: 33%;
	display: flex;
	justify-content: end;
	column-gap: 10px;
`;

const HeaderContainer: React.FC<{ className?: string }> = ({ className }) => {
	const isAuthenticated: boolean = useSelector(selectUserId);
	const userEmail: string = useSelector(selectUserEmail);
	const dispatch: Dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const logout = (): void => {
		request("/logout", "POST").then((response: LogoutResponse) => {
			if (response.error) {
				return;
			}

			sessionStorage.removeItem("user");
			dispatch(setUser(initialUserState));
			navigate("/");
		});
	};

	return (
		<header className={className}>
			<Hamburger isHidden={isAuthenticated ? false : true} />
			<Logo>
				<Link to="/">SpendWise</Link>
			</Logo>
			<AuthButtons>
				{isAuthenticated ? (
					<div className="auth-wrapper">
						<ThemeComponent />

						<div className="user-email">{userEmail}</div>
						<Button onClick={logout}>Log out</Button>
					</div>
				) : (
					<>
						<Link to="/login">
							<Button>Log in</Button>
						</Link>
						<Link to="/register">
							<Button>Sign up</Button>
						</Link>
					</>
				)}
			</AuthButtons>
		</header>
	);
};

const Header = styled(HeaderContainer)`
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1280px;
	height: 70px;
	border: 1px solid black;
	border-top: none;
	padding: 0 30px;
	box-shadow: 0px -2px 15px #000;
	background-color: #fff;
	z-index: 999;

	& .auth-wrapper {
		display: flex;
		align-items: center;
		column-gap: 10px;
	}
`;

export default Header;
