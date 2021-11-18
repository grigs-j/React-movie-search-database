import React from "react";
import PropTypes from "prop-types";

//styles
import { Wrapper, Content, Text } from "./HeroImage.styles";

//implicit return
//immediately destructure props variable to specific props you need otherwise you type prop.image, etc, every time called
const HeroImage = ({ image, title, text }) => (
    //sending image url to wrapper via prop called image
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
                <p>{text}</p>
            </Text>
        </Content>
    </Wrapper>
);

HeroImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
};
export default HeroImage;
