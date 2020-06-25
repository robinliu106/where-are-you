import React from "react";
import { connect } from "react-redux";
import { incrementScore } from "../actions/scoreAction";

const CityButton = (props) => {
    const handleClick = (e) => {
        const result = e.target.value;

        if (result === "true") {
            props.incrementScore();
        }
    };

    const refreshPage = () => {
        window.location.reload(false);
    };
    return (
        <button
            key={props.cityName}
            value={props.cityName === props.answer}
            onClick={handleClick}
        >
            {props.cityName}
        </button>
    );
};

const mapDispatchToProps = (dispatch, props) => ({
    incrementScore: () => dispatch(incrementScore()),
});

export default connect(undefined, mapDispatchToProps)(CityButton);
