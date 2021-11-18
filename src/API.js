import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    API_URL,
    API_KEY,
    REQUEST_TOKEN_URL,
    LOGIN_URL,
    SESSION_ID_URL,
} from "./config";

const defaultConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

const apiSettings = {
    fetchMovies: async (searchTerm, page) => {
        const endpoint = searchTerm
            ? //if there is a search term, the first op will run,
              `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
            : //else this will run
              `${POPULAR_BASE_URL}&page=${page}`;
        //first you await the endpoint, then once you get that info you use that to await the json object
        return await (await fetch(endpoint)).json();
    },
    fetchMovie: async (movieId) => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchCredits: async (movieId) => {
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
    // Bonus material below for login
    //not first part of course
    getRequestToken: async () => {
        const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
        return reqToken.request_token;
    },
    authenticate: async (requestToken, username, password) => {
        const bodyData = {
            username,
            password,
            request_token: requestToken,
        };
        // First authenticate the requestToken
        const data = await (
            await fetch(LOGIN_URL, {
                ...defaultConfig,
                body: JSON.stringify(bodyData),
            })
        ).json();
        // Then get the sessionId with the requestToken
        if (data.success) {
            const sessionId = await (
                await fetch(SESSION_ID_URL, {
                    ...defaultConfig,
                    body: JSON.stringify({ request_token: requestToken }),
                })
            ).json();
            return sessionId;
        }
    },
    rateMovie: async (sessionId, movieId, value) => {
        const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

        const rating = await (
            await fetch(endpoint, {
                ...defaultConfig,
                body: JSON.stringify({ value }),
            })
        ).json();

        return rating;
    },
};

export default apiSettings;
