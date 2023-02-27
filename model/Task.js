const mongoose = require('mongoose');
const schema = mongoose.Schema;


const taskSchema = new schema({
 title:{
 type:String,
 requried:true
},
completed:{
type:Boolean,
default:false
},
user:[{type: schema.Types.ObjectId,
 ref: 'User'} ]
});


module.exports = mongoose.model('Task', taskSchema);