
import Chat from '../models/chat';
import { Request, Response} from "express";

export const getChats = (io:any) => {
  Chat.find().then(result => {
    if(result){   
    return io.emit({'success':true,'message':'Chats fetched successfully', result});
    //io.emit({'success':false,'message':'Some Error'});
    }    
    return io.emit({'success':true,'message':'Chats fetched successfully', result});
  });
}

export const addChat = (io:any,T:any) => {
  let result;
  const newChat = new Chat(T);
  newChat.save((err,Chat) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
      console.log(result);
    }
    else{
      const result = {'success':true,'message':'Chat Added Successfully',Chat}
       io.emit('addChats', result);
    }
  })
}

export const updateChat = (io:any,id:any) => {
  let result;
  Chat.findOneAndUpdate({ _id:id }, id, { new:true }, (err,Chat) => {
    if(err){
    result = {'success':false,'message':'Some Error','error':err};
    console.log(result);
    }
    else{
      const results = Chat.save();
     result = {'success':true,'message':'Chat Updated Successfully',Chat};
     io.emit('ChatUpdated', results);
    }
  })
}

export const getChat = (req:Request,res: Response,io:any) => {
  Chat.find({_id:req.params.id}).exec((err,Chat) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(Chat.length){
      io.emit('ChatDeleted', Chat);
      return res.json({'success':true,'message':'Chat fetched by id successfully',Chat});
    }
    else{
      return res.json({'success':false,'message':'Chat with the given id not found'});
    }
  })
}

export const deleteChat = (io:any,T:any) => {
try{
  Chat.findByIdAndRemove(T._id)
 const result = {'success':true,'message':'Chat deleted successfully'};
  io.emit('ChatDeleted', result);  
}
catch(err){
 console.log(err); 
  }
}