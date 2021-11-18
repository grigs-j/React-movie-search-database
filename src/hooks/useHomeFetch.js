import { useState, useEffect, useRef } from "react";
//API
import API from "../API";
//helpers
import { isPersistedState } from "../helpers";

//setting initial load state
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

//custom hook
export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    //pass initial state to state
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(searchTerm);

    //async func w/ params
    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            //setting previous state to hold so you can mutate
            setState((prev) => ({
                //take all movies data and spread into new object here
                ...movies,
                //ternary op to append new movies to old movies list
                results:
                    page > 1
                        ? [...prev.results, ...movies.results]
                        : [...movies.results],
            }));
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    };

    //useEffect state for fetching data on initial render and search
    //needs empty dependency array to only render on first mount(page laod)
    //we want to trigger useEffect when searchTerm state changes, so we add it to dependency array
    useEffect(() => {
        //setting the session state:
        //we dont check session storage if were in a search
        if (!searchTerm) {
            const sessionState = isPersistedState("homeState");

            if (sessionState) {
                //if we do have something in session, we set it to state here, and then return out of conditional
                setState(sessionState);
                return;
            }
        }

        //wipes old movies once new movies have been fetched after search
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //load more
    useEffect(() => {
        //if were not loading more just return
        if (!isLoadingMore) return;

        //fetch next page, using search term
        fetchMovies(state.page + 1, searchTerm);
        //reset loading state
        setIsLoadingMore(false);
    }, [isLoadingMore, state.page, searchTerm]);

    //write to session storage when searchterm or state changes
    useEffect(() => {
        //session storage must be in string so we are stringifying json object
        if (!searchTerm)
            sessionStorage.setItem("homeState", JSON.stringify(state));
    }, [searchTerm, state]);

    //return object so we can have param properties exported to home.js
    return {
        state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore,
    };
};
