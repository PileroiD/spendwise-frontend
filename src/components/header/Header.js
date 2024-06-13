import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../button-component/Button.tsx";
import { Hamburger } from "../hamburger/Hamburger.tsx";

import { request } from "../../utils";
import { setUser } from "../../actions";
import { initialUserState } from "../../reducers";
import { selectUserId, selectUserEmail } from "../../selectors";
import { ThemeComponent } from "../theme-component/Theme";

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

const HeaderContainer = ({ className }) => {
	const isAuthenticated = useSelector(selectUserId);
	const userEmail = useSelector(selectUserEmail);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		request("/logout", "POST").then(({ error, success }) => {
			if (error) {
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
