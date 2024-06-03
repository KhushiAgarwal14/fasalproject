const mongoose=require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: String, required: true },
    uniqueId:{type:String}
  });
  
  const PlayList=mongoose.model('PlayList',PlaylistSchema);

  module.exports=PlayList;