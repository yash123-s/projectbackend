const mongoose = require('mongoose');
const DonateData =require('../Model/DonateModel');

exports.donate_get_data = function(req, res) {
    DonateData.find({}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };

  exports.donate = function(req, res) {
    console.log(req.body)
    var donateData = new DonateData(req.body);
    donateData.save(function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
  };