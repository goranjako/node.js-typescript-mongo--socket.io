import mongoose from 'mongoose';


const ChatSchema = new mongoose.Schema({
  room: String,
  nickname: String,
  message: String,
  updated_at: { type: Date, default: Date.now },
});


export default mongoose.model('Chat', ChatSchema);