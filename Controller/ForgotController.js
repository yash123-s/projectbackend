// const mongoose = require('mongoose');
// const Forgot =require('../Model/ForgotModel');

// exports.getForgot = function(req, res) 
// {
//   Forgot.findById(req.params.taskId, function(err, task) {
//   if (err)
//   res.send(err);
//   res.json(task);
//   });
// };
// exports.postForgot= function(req, res) {
//   var Data = new Forgot(req.body);  
//   // Data.save(function(err, data) {
//   //     if (err)
//   //       res.send(err);
//   //     res.json(data);
//       var donateData = new Forgot(req.body);
//       donateData.save(function(err, data) {
//         if (err)
//           res.send(err);
//         res.json(data);
//       });
//       var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
    
//         auth: {
//           user: 'yashaswinisgowda444@gmail.com',
//           pass: 'manipuri'
//         }
//       });
//       mailOptions = {
//           from: 'yashaswinisgowda444@gmail.com',
//           to: req.body.email,
//           subject: 'Appreciation for Donating',
//           text: `Thank you for donating`+ donateData.amount + donateData.amounttype
//         };
//         transporter.sendMail(mailOptions, (error, info)=>{
//           if (error) {
//             return console.log(error.message);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
//     // });
// }