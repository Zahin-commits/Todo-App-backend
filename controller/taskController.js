const Task = require('../model/Task')

exports.getAllTask =async (req,res)=>{
 try {
    const allTask = await Task.find({user:req.user.id});

    res.send(allTask)
 } catch (error) {
    res.send(error)
 }
}

exports.createTask = async (req,res)=>{
if(!req.body.title){
return res.send('please provide a title')
}

try {
  const newTask = new Task({
 title:req.body.title,
 user: req.user.id
  })
  await newTask.save()

  res.send(newTask)
} catch (error) { 
 res.send(error)
}
 
}

exports.deleteTask=async(req,res)=>{
    const id = req.params.id
 if(!id){
 return res.send('somethhing went wrong');
 }
 try {
 const data = await Task.findByIdAndDelete(id);
  res.send(data)  
 } catch (error) {
    res.send(error)
 }
}

exports.completeTask = async(req,res)=>{
 const id = req.params.id
 try {
 const task = await Task.findById(id);
 if(!task){ 
 return res.send('no task found')
 }
task.completed = !task.completed;

await task.save()
res.send(task)
} catch (error) {
    
 }   
}