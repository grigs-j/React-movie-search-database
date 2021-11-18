import React from "react";
//api
import API from "../API";
//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
//components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
//hooks
import { useHomeFetch } from "../hooks/useHomeFetch";
//fallback image
import NoImage from "../images/no_image.jpg";

const Home = () => {
    //destructuring params for custom hook
    const {
        state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore,
    } = useHomeFetch();

    console.log(state);

    //error catch return page
    if (error) return <div>Something went wrong...</div>;

    //short circuit conditional
    return (
        <>
            {
                //if search term has a string and we have the results of first index, then display hero image
                !searchTerm && state.results[0] ? (
                    <HeroImage
                        //grabbing our result props using object literals to source from movie database api endpoints
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                        title={state.results[0].original_title}
                        text={state.results[0].overview}
                    />
                ) : null
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? "Search Results:" : "Popular Movies"}>
                {state.results.map((movie) => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL +
                                  POSTER_SIZE +
                                  movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {
                // if loading is false spinner wont display
                loading && <Spinner />
            }
            {
                //checking that we are not on the last page and not loading anything
                state.page < state.total_pages && !loading && (
                    <Button
                        text="Load More"
                        callback={() => setIsLoadingMore(true)}
                    />
                )
            }
        </>
    );
};

export default Home;
