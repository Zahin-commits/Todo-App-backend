const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
 name:{
 type:String,
 requried:true,
 unique:true
},
email:{
type:String,
unique:true,
required: true
},
password:{
 type:String,
 requried:true,
 }
});


module.exports = mongoose.model('User', userSchema);