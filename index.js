const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/Chat"); // Corrected path
const methodOverride=require("method-override");

let port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}




app.listen(port, () => {
  console.log("App is Listening on port", port);
});

// app.get("/get", (req, res) => {
//   res.send("hiii there yash khedkar");
// });

app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
    console.log(chats);
})

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

app.get("/chats/:id/edit",async (req,res)=>{
  
  let {id}= req.params;
  let chat= await Chat.findById(id);
  res.render("edit.ejs",{chat});

})

app.put("/chats/:id",async(req,res)=>{
  let{id}=req.params;
  let{msg:newMsg}=req.body;

  let UpdatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
  console.log(UpdatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
  let{id}=req.params;
  let deletedchat= await Chat.findByIdAndDelete(id);
  console.log(deletedchat);
  res.redirect("/chats");
});

app.post("/chats",(req,res)=>{
  let{from,msg,to}=req.body;

  let newChat= new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at: new Date(),
  });
  newChat.save().then((res)=>{
    console.log("chat saved");
  }).catch((err)=>{
    console.log(err);
  });
  res.redirect("/chats")
 
  
})