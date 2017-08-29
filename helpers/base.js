module.exports = {
    setSucceededResponse: function(response, message = null, data = null, token = null) {
        var body = {
            "status": "OK"
        };

        if (message != null) { body.message = message; }
        if (data != null) { body.data = data; }
        if (token != null) { body.token = token; }

        response.status(200).send(body);
    },

    setFailedResponse: function(response, message) {
        var body = {
            "status": "ERROR",
            "message": message
        };

        response.status(500).send(body);
    }
}