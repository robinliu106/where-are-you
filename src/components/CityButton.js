import React from "react";
import { connect } from "react-redux";
import { incrementScore, decrementScore } from "../actions/scoreAction";

const CityButton = (props) => {
    const handleClick = (e) => {
        const result = e.target.value;

        if (result === "true") {
            props.incrementScore();
        } else {
            props.decrementScore();
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
    decrementScore: () => dispatch(decrementScore()),
});

export default connect(undefined, mapDispatchToProps)(CityButton);
