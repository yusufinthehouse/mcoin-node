var connection = require('./../config/mysql');

module.exports = { 
    create: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var full_name = req.body.full_name;
        var birth_date = req.body.birth_date;
        var photo = 'photo';

        connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
            if (error) {
                base_helpers.setFailedResponse(res, "Something happened with our system!");
            } else {  
                if(results.length >0) {
                    base_helpers.setFailedResponse(res, "User already exist!");
                } else {
                    connection.query(
                        'INSERT INTO users (email, password, full_name, birth_date, photo) VALUES (?, ?, ?, ?, ?)',
                        [email, password, full_name, birth_date, photo], 
                        function (error, results, fields) {
                            if (error) {
                                base_helpers.setFailedResponse(res, "Something happened with our system!");
                            }else{  
                                base_helpers.setSucceededResponse(res, "User successfully registered!");
                            }
                    });
                }
            }
        });
    },

    get: function(req, res) {
        var user_id = req.params.id;
        connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
            if (error) {
                base_helpers.setFailedResponse(res, "Something happened with our system!");
            }else{  
                if(results.length >0) {
                    base_helpers.setSucceededResponse(res, null, results[0]);
                } else {
                    base_helpers.setFailedResponse(res, "User does not exist!");
                }
            }
        });
    },
        
    update: function(req, res) {
        var user_id = req.params.id;

        var email = req.body.email;
        var password = req.body.password;
        var full_name = req.body.full_name;
        var birth_date = req.body.birth_date;
        var photo = 'photo';

        connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
            if (error) {
                base_helpers.setFailedResponse(res, "Something happened with our system!");
            } else {  
                if(results.length >0) {
                    connection.query(
                        'UPDATE users SET email = ?, password = ?, full_name = ?, birth_date = ?, photo = ? WHERE id = ?',
                        [email, password, full_name, birth_date, photo, user_id], 
                        function (error, results, fields) {
                            if (error) {
                                base_helpers.setFailedResponse(res, "Update failed!");
                            }else{  
                                base_helpers.setSucceededResponse(res, "User successfully updated!");
                            }
                    });
                } else {
                    base_helpers.setFailedResponse(res, "User does not exist!");
                }
            }
        });
    },

    delete : function(req, res) {
        var user_id = req.params.id;
        
        connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
            if (error) {
                base_helpers.setFailedResponse(res, "Something happened with our system!");
            } else {  
                if(results.length >0) {
                    connection.query(
                        'DELETE FROM users WHERE id = ?',
                        [user_id], 
                        function (error, results, fields) {
                            if (error) {
                                base_helpers.setFailedResponse(res, "Delete failed!");
                            }else{  
                                base_helpers.setSucceededResponse(res, "User successfully deleted!");
                            }
                    });
                } else {
                    base_helpers.setFailedResponse(res, "User does not exist!");
                }
            }
        });
    }
}