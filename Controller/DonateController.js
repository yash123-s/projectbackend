const mongoose = require('mongoose');
const DonateData =require('../Model/DonateModel');
var nodemailer = require ('nodemailer');

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
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: 'yashaswinisgowda444@gmail.com',
      pass: 'manipuri'
    }
  });
  mailOptions = {
      from: 'yashaswinisgowda444@gmail.com',
      to: req.body.email,
      subject: 'Appreciation for Donating',
      text: `Thank you for donating`+ donateData.amount + donateData.amounttype
    };
    transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
        return console.log(error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  // })
};

// exports.sendFeedback = function(req, res){
//   // const reg_email=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
//   // console.log(req.body)
//     // if(reg_email.test(req.body.email)){
//       var mail = new nodemailer1(req.body);
//       mail.save(function(err, data){
//         if(err)
//           res.send(err.message);
//           res.json(data);
//       var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,

//         auth: {
//           user: 'ysureshostb2@gmail.com',
//           pass: 'manipuri'
//         }
//       });
//       mailOptions = {
//           from: 'ysureshostb2@gmail.com',
//           to: req.body.email,
//           subject: 'requesting to complete project',
//           text: `Hii your deadline is very soon plz submmit your project as soon as possible`      
//         };
//         transporter.sendMail(mailOptions, (error, info)=>{
//           if (error) {
//             return console.log(error.message);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
//       })
//     // }
//     // else {
//     //   res.send('Email is invalid');
//     // }
//   };