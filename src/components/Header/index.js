import React from "react";
import { Link } from "react-router-dom";

import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

//header component
const Header = () => (
    //implicit return
    <Wrapper>
        <Content>
            <Link to="/">
                <LogoImg src={RMDBLogo} alt="rmdb-logo" />
            </Link>
            <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
        </Content>
    </Wrapper>
);
//you can export here or in function
export default Header;
