export let dataHandler = {

    api_get: function api_get(url, callback) {
        fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
        })
            .then(response => response.json())
            .then(data => callback(data))
    },

    api_post:
        function api_post(url, data, callback) {
            fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => callback(data));
        }

};