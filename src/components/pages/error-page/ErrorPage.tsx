import styled from "styled-components";
import { useEffect } from "react";

import { Title, SubTitle, Description, MainLink } from "./styles";

const ErrorPageContainer: React.FC<{ className?: string }> = ({ className }) => {
	useEffect(() => {
		document.title = "Error 404";
	}, []);

	return (
		<section className={className}>
			<Title>Ooops!</Title>
			<SubTitle>Error 404</SubTitle>
			<Description>Page not found</Description>
			<MainLink to="/">Main page</MainLink>
		</section>
	);
};

const ErrorPage = styled(ErrorPageContainer)``;

export default ErrorPage;
