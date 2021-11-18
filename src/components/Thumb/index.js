import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//styles
import { Image } from "./Thumb.styles";

const Thumb = ({ image, movieId, clickable }) => (
    //implicit return, if clickable is true link is provided via object literal movie id
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} />
            </Link>
        ) : (
            <Image src={image} />
        )}
    </div>
);

Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool,
};
export default Thumb;
