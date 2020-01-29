const mongoose = require('mongoose');
const UserData =require('../Model/LoginModel');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodemailer = require ('nodemailer');

exports.get_a_data = function(req, res) {
UserData.find({}, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
    };

exports. signup= function(req, res){
  console.log(req.body,"connect")
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_mob=/^[0-9]{10}$/;
  const reg_pwd=/^[a-zA-Z0-9@*#]{8,15}$/;
  if(!reg_pwd.test(req.body.password)){
  console.log(req.body.password)
  res.send('password is invalid');
}
  if(!reg_mob.test(req.body.mobile)){
      res.send('Mobile number is invalid');
  }
  if(reg_email.test(req.body.email)){
    UserData.find({email: req.body.email},function(err, data){
    if(data != null && data != ''){
      res.send('User already exists');
  }
  else{
      var userData = new UserData(req.body);
      // bcrypt.genSalt(10, function(err, salt){
      //     bcrypt.hash(userData.password, salt, function(err, hash) {
      //         userData.password = hash;
      
      const pword = cryptr.encrypt(req.body.password);
      userData.password = pword;
              userData.save(function(err, data){
          if(err)
          res.send(err.message);
          res.json('User Created Succesfully');
          })
          // })
          // })
      }
      });
      }
  else {
  res.send('Email is invalid');
  }var transporter = nodemailer.createTransport({
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
      subject: 'Registration',
      text: `Successfully registered to CHARITY.`
    };
    transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
        return console.log(error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

exports.read_a_task = function(req, res) 
{
UserData.findById(req.params.taskId, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
};

exports.update_data = function(req, res){
    UserData.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
};
exports.delete_a_task = function(req, res) {
    UserData.remove({_id: req.params.taskId}, function(err, task) {
    if (err)
    res.send(err);
    res.json({ message: 'Task successfully deleted' });
    });
};
exports.changepassword = (req, res)=> {
  console.log(req.body,"hai")
  const pword = cryptr.encrypt(req.body.password);
  req.body.password = pword;
  UserData.findOneAndUpdate({email: req.body.email}, req.body, {new: true}, function(err, task) {
  if (err)
  res.send(err);
 
  res.json(task);
  });
};
exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  const role=req.body.role;
  let loadedUser;
  UserData.findOne({email: email})
.then(user =>{
  if(!user){
    const error = new Error('A user with this email could not be found.');
    error.statusCode = 401;
    throw error;
  }
  loadedUser = user;
  const pword = cryptr.decrypt(user.password);
  // console.log("hi",password,pword)
  return (password===pword);
  // return (password===user.password?true:false)
})   
.then(isEqual =>{
  if(!isEqual){
    const error = new Error('wrong password.');
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(
  {   
    role:loadedUser.role,
    email: loadedUser.email,
    userId:loadedUser._id.toString()
  },'secret')
  return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email , role: loadedUser.role})
})
.catch(err => {
  if (!err.statusCode) {
  err.statusCode = 500;
}
next(err);
}); 
}  
// exports.confirmmail = (req,res,next) =>{
//   const email = req.body.email;
//   let loadedUser;
//   UserData.findOne({email: email})
//   .then(user =>{
//     if(!user){
//       const error = new Error('User does not exist');
//       error.statusCode = 401;
//       throw error;
//     }
//     loadedUser = user;
//     var transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
      
//       auth: {
//         user: 'yashaswinisgowda444@gmail.com',
//         pass: 'manipuri'
//       }
//       });
//       mailOptions = {
//       from: 'yashaswinisgowda444@gmail.com',
//       to: req.body.email,
//       subject: 'reset password',
//       text: `your password is `+ `http://localhost:3000/newpassword`
//       };
//       transporter.sendMail(mailOptions, (error, info)=>{
//       if (error) {
//         return console.log(error.message);
//         } else {
//           console.log('Email sent: ' + info.response);
//       }
//       });
//     const token = jwt.sign(
//     {
//       email: loadedUser.email,
//       userId:loadedUser._id.toString()
//     },'secret')
//     return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
//   })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }); 
//   }

