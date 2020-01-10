var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema1 = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    project:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    amounttype:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tasks1', TaskSchema1);