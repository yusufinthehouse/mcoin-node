var jwt = require('jsonwebtoken');

var connection = require('./../config/mysql');

module.exports = { 
    login : function(req, res) {
        var email = req.body.email;
        var password = req.body.password; 

        connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
            if (error) {
                base_helpers.setFailedResponse(res, "Something happened with our system!");
            } else {  
                if(results.length >0) {
                    if(password == results[0].password){
                        var token = jwt.sign(results[0], secret_key,{
                            expiresIn: 5000
                        });

                        base_helpers.setSucceededResponse(res, null, null, token);
                    } else {
                        base_helpers.setFailedResponse(res, "Invalid username or password!");
                    }
                } else {
                    base_helpers.setFailedResponse(res, "Invalid username or password!");
                }
            }
        });
    }
}