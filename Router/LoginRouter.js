module.exports = function(app) {
  const todoList = require('../Controller/LoginController');
  const donateList = require('../Controller/DonateController');

  app.route('/Signup')
  .get(todoList.get_a_data)
  .post(todoList.signup)
 
  app.route('/Signin')
  .post(todoList.userSignin);
  
  app.route('/donate')
  .post(donateList.donate)
  .get(donateList.donate_get_data)

  app.route('/Singup/:SingupId')
  .get(todoList.read_a_task)
  .put(todoList.update_data)
  .delete(todoList.delete_a_task);

  app.route('/donate')
  .get(donateList.donate_get_data)
  .post(donateList.donate)

  // app.route('/News')
  // .get(NewsUpdate.getNews)
  // .post(NewsUpdate.postNews)
  

  // app.route('/Forgot')
  //   .get(ForgotPassword.getForgot)
  //   .post(ForgotPassword.postForgot)
  // app.route('/confirm')
  // .post(todoList.confirmmail,isAuth)

  app.route('/reset')
  .put(todoList.changepassword);
  };