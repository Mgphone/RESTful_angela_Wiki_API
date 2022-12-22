//jshint esversion 
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const express=require("express");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));
mongoose.set('strictQuery',false)
mongoose.connect("mongodb+srv://mgphone:mgphone@cluster0.ccftyls.mongodb.net/wikiDB");
const articleSchema={
  title:String,
  content:String
};
const Article=mongoose.model("Article",articleSchema);
///////////// Requested Targetting Articles/////////////
app.route("/articles")

.get(function(req,res){
  Article.find(function(err,article){
    if(!err){
     res.send(article);
    }
    else{
      res.send(article);
    }
  });
})

.post(function(req,res){
  // console.log(req.body.title);
  // console.log(req.body.content);
  const article=new Article({
    title:req.body.title,
    content:req.body.content
  });
article.save(function(err){
  if (!err){
    res.send("Successfully aded a new article")
  }
  else{
    res.send(err);
  }
});
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    
  if(!err){
    res.send("Succssfully Deleted");
  }
  else{
    res.send(err);
  } 
  });
});

///////////// Requested Targetting  A Specific Articles/////////////
app.route("/articles/:pageId")
.get(function(req,res){
  const customPageId=req.params.pageId;
Article.findOne({title:customPageId},function(err,result){
  if(!err){
    if(result){
      res.send(result);
    }
    else
   {
      res.send("No Result Found");
    }
  }
  
});
})
.post(function(req,res){
  const article=new Article({
    title:req.body.title,
    content:req.body.content
  });
  article.save(function(err){
    if(!err){
      res.send("Successfuly add the new Data")
    }
    else{
      res.send(err);
    }
  })
})
.put(function(req,res){
  Article.replaceOne(
    {title:req.params.pageId},
    {title:req.body.title,content:req.body.content},
    {overwrite:true},
    function(err){
      if(!err){
        res.send("Succefully Replace");
      }
    }
    
  );
})

.patch(function(req,res){
  
  Article.updateOne(
  {title:req.params.pageId},
  // {$set:req.body}, // that is the same value
  {title:req.body.title,content:req.body.content},
  function(err){
    if(!err){
      res.send("Succefflly updated");
    }
  }
  

  );
})
.delete(function(req,res){
  Article.deleteOne(
    {title:req.body.title},
    function(err){
      if(!err){
        res.send("Succefully deleted "+req.body.title)
      }
      else{
        res.send(err);
      }
    }
  );
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});