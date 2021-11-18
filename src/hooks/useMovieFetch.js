import { useState, useEffect, useCallback } from "react";
//API
import API from "../API";
//helpers
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //by moving fetchMovie func out of useEffect it creates an infinity loop constantly triggering a new rerender from what was just rendered, we need to use useCallback to stop that, with  a rerender only triggering from movieid changing
    //this allows you to call this globally
    const fetchMovie = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            //get directors out of crew property
            const directors = credits.crew.filter(
                (member) => member.job === "Director"
            );

            setState({ ...movie, actors: credits.cast, directors });
            setLoading(false);
        } catch (error) {
            setError(true);
        }
        //setting state
        const sessionState = isPersistedState(movieId);
        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovie();
    }, [movieId, fetchMovie]);

    return { state, loading, error };
};
