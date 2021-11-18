import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
//Image
import searchIcon from "../../images/search-icon.svg";
//styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState("");
    //creates mutable value held in initial.current that doesnt trigger rerender
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        //cleanup func
        return () => clearTimeout(timer);
    }, [setSearchTerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="" />
                <input
                    type="text"
                    placeholder="Search movie here"
                    //need to write inline function to pass args to onChange so it doesnt fire immediately on render
                    onChange={(e) => setState(e.currentTarget.value)}
                />
            </Content>
        </Wrapper>
    );
};

SearchBar.propTypes = {
    callback: PropTypes.func,
};
export default SearchBar;
