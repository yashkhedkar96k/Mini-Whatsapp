const mongoose = require("mongoose");
const Chat = require("./models/Chat");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allchats=[
   
    {
        from: "abc",
        to: "nik",
        msg: "he is a appp developer",
        created_at: new Date(),
    },
   
    {
        from: "yash",
        to: "nik",
        msg: "he is a web developer",
        created_at: new Date(),
    },
   
    {
        from: "shubh",
        to: "nik",
        msg: "he is a laravel developer",
        created_at: new Date(),
    },

]
Chat.insertMany(allchats);

  