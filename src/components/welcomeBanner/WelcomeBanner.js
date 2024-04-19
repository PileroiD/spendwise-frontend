import { Link } from "react-router-dom";
import styled from "styled-components";

import {
    Title,
    Description,
    Feature,
    FeatureItem,
    RegDescr,
    PurpleCircle,
    PinkCircle,
    BlueCircle,
} from "./styles";

const WelcomeBannerContainer = ({ className }) => {
    return (
        <section className={className}>
            <Title>SpendWise</Title>
            <Description>
                Our website is a comprehensive financial management tool
                designed to help users track their income and expenses
                effortlessly. <br />
                With intuitive interfaces and powerful features, users can gain
                insights into their financial health, make informed decisions,
                and achieve their financial goals
            </Description>
            <ul>
                <li>
                    <Feature>Expense Tracking:</Feature>
                    <FeatureItem>
                        Easily record and categorize expenses to understand
                        where your money is going.
                    </FeatureItem>
                </li>

                <li>
                    <Feature>Income Management:</Feature>
                    <FeatureItem>
                        Keep track of various sources of income to get a clear
                        picture of your cash flow
                    </FeatureItem>
                </li>

                <li>
                    <Feature>Budget Planning:</Feature>
                    <FeatureItem>
                        Set up budgets for different expense categories and
                        monitor your spending to stay on track.
                    </FeatureItem>
                </li>

                <li>
                    <Feature>Customizable Reports:</Feature>
                    <FeatureItem>
                        Generate detailed reports and visualizations to analyze
                        your financial data effectively.
                    </FeatureItem>
                </li>

                <li>
                    <Feature>Goal Setting:</Feature>
                    <FeatureItem>
                        Set financial goals and track your progress towards
                        achieving them over time.
                    </FeatureItem>
                </li>

                <li>
                    <Feature>Secure and Private:</Feature>
                    <FeatureItem>
                        We prioritize the security and privacy of your financial
                        information, ensuring it remains safe and confidential.
                    </FeatureItem>
                </li>
            </ul>
            <Description>
                Whether you're managing personal finances, planning for the
                future, or running a small business, our website provides the
                tools you need to take control of your finances and build a
                brighter financial future.
            </Description>

            <RegDescr>
                <Link to="/register">Register</Link> to take advantage of all
                the features of your application
            </RegDescr>

            <PurpleCircle />
            <PinkCircle />
            <BlueCircle />
        </section>
    );
};

export const WelcomeBanner = styled(WelcomeBannerContainer)`
    padding: 0 50px;
    position: relative;
    z-index: 1;

    & ul {
        margin: 40px 0;
    }

    & li {
        margin-bottom: 10px;
    }
`;
