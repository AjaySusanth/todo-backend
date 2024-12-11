import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },

    task:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["completed","pending"],
        default:'pending',
        required:true
    }
},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema);

