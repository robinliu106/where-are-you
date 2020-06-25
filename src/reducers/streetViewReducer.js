export default (state = false, action) => {
    switch (action.type) {
        case "RELOAD_STREET_VIEW":
            return !state;
        default:
            return state;
    }
};
