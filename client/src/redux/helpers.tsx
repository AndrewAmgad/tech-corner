export const fetchDataBegin = (dataType: string) => ({
    type: dataType + "_BEGIN"
});

export const fetchDataSuccess = (dataType: string, data: any) => ({
    type: dataType + "_SUCCESS",
    payload: { data }
});

export const fetchDataFailure = (dataType: string, error: any) => ({
    type: dataType + "_FAILURE",
    payload: { error }
});

export var apiUrl : string | undefined = ""

if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.REACT_APP_LOCAL_API;
} else {
    apiUrl = process.env.REACT_APP_API_URL
};

// Request a new access token using the stored refresh token cookie
export const refreshAccessToken = () => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/v1/users/access-token`, { method: 'GET', credentials: 'include' })
            .then(async response => {
                let parsedJSON = await response.json()
                if (response.status !== 200) return reject(parsedJSON);
                else resolve();

            }).catch(err => reject(new Error(err)));
    })
}

export const httpRequest = (reqMethod: string, url: string, query?: any, headers?: any, payload?: any) => {
    return new Promise((resolve, reject) => {

        /**
         * Create the final URL and add any provided query parameters to it
         */
        let finalUrl = new URL(apiUrl + url);
        let queryParams = query;

        finalUrl.search = new URLSearchParams(queryParams).toString();

        /**
         * Check if headers were sent, if not create an empty headers object
         * Add Content-Type value to the headers object
         */
        if (!headers) headers = {}
        if(headers['Content-Type'] === 'multipart/form-data') {
            delete headers['Content-Type']
        } else if(!headers['Content-Type']) headers['Content-Type'] = 'application/json';

        /**
         * Set the request options
         */
        let options: {credentials: any, method: string, headers: any, body?: any} = {
            method: reqMethod,
            credentials: "include",
            headers: headers,
        }

        /**
         * Check if payload data was provided through the function arguments and add it through the req body
         */
        if (payload) {
            if(payload instanceof FormData) options.body = payload;
            else options.body = JSON.stringify(payload)
        }

        fetch(finalUrl.toString(), options)
            .then(async (response) => {
         
                const parsedJSON = await response.json();

                // Check if the access token has expired, request a new one if it is
                if (response.status === 401) {

                    refreshAccessToken().then(() => {
                        // Send the same request again after obtaining a new refresh token
                        fetch(finalUrl.toString(), options).then(async (response) => {
                            const parsedResponse = await response.json();

                            if (response.status !== 200) reject(parsedResponse);
                            else resolve(parsedResponse);
                        });
                    }).catch(err => reject(err))

                } else if (response.status !== 200) {
                    reject(parsedJSON)
                } else resolve(parsedJSON)

            })
            .catch(err => {
                console.log(err)
                reject(new Error(err))
            });
    })
};
