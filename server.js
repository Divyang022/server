const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const expressAsyncHandler=require("express-async-handler");
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  const app=express();
  app.use(cors(corsOpts));
  app.use(express.json()); //It parses incoming JSON requests and puts the parsed data in req.body



mongoose.connect( "mongodb+srv://notes-database:divyang@cluster0.nvr0e.mongodb.net/notes", { useNewUrlParser: true });

const noteSchema=new mongoose.Schema({

    title:String,
    content:String
});

const Post=mongoose.model("Post",noteSchema);

app.post("/api",function(req,res){

    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save(function(err){

        if(err)
        console.log(err);
        
    
      });
    


});

app.delete("/apiDelete",function(req,res){

  Post.deleteOne({title:req.body.title},{content:req.body.content},function(err){
    
    if(err)
    console.log(err);
    else
    console.log("deleted successfully");
  });
});
app.delete("/DeleteAll",function(req,res){

  Post.deleteMany({},function(err)
  {
    if(err)
    console.log(err);
    else
    console.log("deleted successfully");
  });
})
app.get("/get",expressAsyncHandler(async(req,res)=>{
  const services=await Post.find({});
  res.send(services);
}))


let port = process.env.PORT;
if (port === null || port === "") {
  port = 5000;
}
app.listen(port);

app.listen(port,function(){
    console.log("started");
});