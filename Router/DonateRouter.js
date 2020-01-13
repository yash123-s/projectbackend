module.exports = function(app) {
    const donateList = require('../Controller/DonateController');
    const isAuth=require('../Middleware/isAuth')
    
    
    app.route('/donate')
    .get(donateList.donate_get_data)
    .post(donateList.donate);

    // app.route('/Donate')
    // .get(donateList.donate_read)
    // .put(donateList.donate_update)
    // .delete(donateList.donate_delete);
    };