(function () {
    "use-strict";
    var Promise = require('promise'),
        connection = require('./Connections.js'),
        db;

    module.export.getUsers = function (req, res) {
        db = connection.exportDbConnection();
        if (db !== null) {
            db.collection('user').find().toArray(function (err, items) {
                if (err) {
                    res.send(err);
                } else if (items) {
                    res.send(items);
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.getUserById = function (req, res) {
        db = connection.exportDbConnection();
        var id = req.params.id;
        if (db !== null) {
            db.collection('user').find({"_id": id}).toArray(function (err, items) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(items);
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.getUserByName = function (req, res) {
        db = connection.exportDbConnection();
        var userName = req.params.name;
        if (db !== null) {
            db.collection('user').find({"name": {$regex: new RegExp(userName, "i") }}).toArray(function (err, items) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(items);
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.getLatestScoreFromUserId = function (req, res) {
        db = connection.exportDbConnection();
        var id = req.params.id;
        if (db !== null) {
            db.collection('user').find({"_id": id}).toArray(function (err, items) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(items.recentScore);
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.getUserTopScoresFromUserId = function (req, res) {
        db = connection.exportDbConnection();
        var id = req.params.id;
        if (db !== null) {
            db.collection('user').find({"_id": id}).toArray(function (err, items) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(items.topScores);
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.deleteUserById = function (req, res) {
        db = connection.exportDbConnection();
        var id = req.params.id;
        if (db !== null) {
            db.collection('user').deleteOne({"_id": id}, function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result) {
                    res.send("Success");
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };

    module.export.deleteUserByName = function (req, res) {
        db = connection.exportDbConnection();
        var playerName = req.params.name;
        if (db !== null) {
            db.collection('user').deleteOne({"name": {$regex: new RegExp(playerName, "i")}}, function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result) {
                    res.send("Success");
                }
            });
        } else {
            res.send("Couldn't retrieve database object");
        }
    };
}());