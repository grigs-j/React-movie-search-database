// Convert time to hours and minutes
export const calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });
    return formatter.format(money);
};

//creating session storage of data
export const isPersistedState = (stateName) => {
    //returns the state from the session storage otherwise we return null
    const sessionState = sessionStorage.getItem(stateName);
    //session storage must be in a string, so we parse it back to a json object
    return sessionState && JSON.parse(sessionState);
};
