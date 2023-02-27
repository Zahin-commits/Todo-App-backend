const bctypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
 const {name, email, password} = req.body;

 if(!name || !email || !password){
  return res.status(400).send('name email and password are required');
 }

 try {
    const salt = await bctypt.genSalt(10);
    const hashedPass = await bctypt.hash(password,salt);

    const newUser = new User({
        name,
        email,
        password: hashedPass
    });

    await newUser.save()
  
    res.status(201).send(newUser)
    /* res.redirect('/login') */
 } catch (error) {
    res.status(500).send(error)
 }
 
}

exports.login = async(req,res)=>{
   const { email, password} = req.body;

 if(!email || !password){
   return res.status(400).send('Email and password are required');
 }
 try {
   const user = await User.findOne({email})
 
   const isPasswordCorrect = await bctypt.compare(password,user.password);
if (!isPasswordCorrect) {
 return res.status(403).send('invalid password')
}
const payload = {
 name: user.name,
 id:user._id
};

const token = jwt.sign(payload,process.env.KEY,{expiresIn:'1d'});


   res.status(202).cookie('access_token',token,{
   httpOnly:true
   }).send(`welcoom to the site dear ${user.name}`)
   
 } catch (error) {
   res.status(500).send(error)
 }
}


exports.logout = (req,res)=>{
  res.clearCookie('access_token');
  res.send('you have been logged out')
}


exports.isLoggedIn = (req,res)=>{
const token =  req.cookies.access_token;
if(!token){
 return res.json(false)
}
return jwt.verify(token,process.env.KEY,(err)=>{
  if(err){
  return res.json(false)
  }else{
   return res.json(true)
  }
})
}