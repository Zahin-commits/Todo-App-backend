const jwt = require('jsonwebtoken');


exports.checkAuth = (req,res,next)=>{
 const token = req.cookies.access_token;

 if (!token){
    return res.send('please login or create a new id')
 }

 try {
    jwt.verify(token,process.env.KEY,(error,decoded)=>{
    if(error){
     return res.send(error)
    }
  req.user = decoded
    })

    next()
 } catch (error) {
    
 }
}