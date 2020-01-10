module.exports = function(app) {
  const todoList = require('../Controller/LoginController');
  const isAuth=require('../Middleware/isAuth')
  const donateList = require('../Controller/DonateController');

  
  app.route('/Signup')
  .get(todoList.get_a_data)
  .post(todoList.signup);
  
  app.route('/Signin')
  .get(todoList.userSignin);
  
  app.route('/donate')
  .post(donateList.donate)
  .get(donateList.donate_get_data)

  
  
  app.route('/Singup/:SingupId')
  .get(todoList.read_a_task)
  .put(todoList.update_a_task)
  .delete(todoList.delete_a_task);
  };