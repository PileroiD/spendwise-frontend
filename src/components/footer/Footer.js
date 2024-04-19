import styled from "styled-components";

import facebookIcon from "../../icons/facebook.icon";
import twitterIcon from "../../icons/twitter.icon";
import instagramIcon from "../../icons/instagram.icon";

const Socials = styled.nav`
    list-style-type: none;
    display: flex;
    justify-content: center;
    column-gap: 20px;
`;

const FooterContainer = ({ className }) => {
    return (
        <footer className={className}>
            <div>
                <Socials>
                    <li>
                        <a href="#">{facebookIcon}</a>
                    </li>
                    <li>
                        <a href="#">{twitterIcon}</a>
                    </li>
                    <li>
                        <a href="#">{instagramIcon}</a>
                    </li>
                </Socials>
            </div>
            <div className="footer-bottom">
                &copy; 2024 SpendWise.com | Designed by PileroID
            </div>
        </footer>
    );
};

const Footer = styled(FooterContainer)`
    width: 100%;
    height: 100%;
    background: #292929;
    color: #fff;
    padding: 20px;
    text-align: center;
    margin-top: 50px;
`;

export default Footer;
