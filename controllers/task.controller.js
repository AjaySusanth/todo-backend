import { Task } from "../models/task.model.js";

export const createTask = async(req,res) => {
    const {task,status} = req.body;

    if(!task) {
        return res.status(400).json({
            message:"Task is required",
            success:false
        })
    }

    if (status && !['completed','pending'].includes(status)) {
        return res.status(400).json({
            message: "Invalid status. Allowed values are 'completed' or 'pending'.",
            success: false,
        })
    }

    try{
        const newTask = new Task({
            userId:req.userId,
            task,
            status
        })
    
        await newTask.save();
        res.status(201).json({
            message:"Task created successfully",
            success:true,
            task:newTask,

        })
    } catch(error) {
        console.log("Error in creatTask", error)
        res.status(500).json({
            message:`Unexpected error in creating task: ${error.message}`,
            success:false
        })
    }
}

export const getTasks = async(req,res) =>{
    try{
        const tasks = await Task.find({userId:req.userId}).select(['task','status']).sort({createdAt:-1})

        if(tasks.length === 0) {
            return res.status(200).json({
                message:"No tasks found",
                success:true,
                tasks
            })
        }

        res.status(200).json({
            message:"Tasks retrieved successfully",
            success:true,
            tasks
        })
    } catch(error) {
        console.log("Error in getTask", error)
        res.status(500).json({
            message:`Unexpected error in retrieving tasks: ${error.message}`,
            success:false
        })
    }
}

export const updateTask = async(req,res) => {
    const {id} = req.params;
    const {task,status} = req.body;

    if (status && !['completed','pending'].includes(status)) {
        return res.status(400).json({
            message: "Invalid status. Allowed values are 'completed' or 'pending'.",
            success: false,
        })
    }

    try{
        const updatedTask = await Task.findByIdAndUpdate(
            {_id:id,userId:req.userId},
            {task,status}
        )

        if(!updatedTask) {
            return res.status(404).json({
                message:"Task not found",
                success:false
            })
        }
        res.status(200).json({
            message:"Task updated successfully",
            success:true,
            task:{
                task:updatedTask.task,
                status:updatedTask.status
            }
        })

    } catch(error) {
        console.log("Error in updateTask", error)
        res.status(500).json({
            message:`Unexpected error in updating task: ${error.message}`,
            success:false
        })
    }
}

export const deleteTask = async(req,res) => {
    const {id} = req.params;
    try{
        const task = await Task.findByIdAndDelete({_id:id,userId:req.userId})
        if(!task) {
            return res.status(404).json({
                message:"Task not found",
                success:false
            })
        }

        res.status(200).json({
            message:"Task deleted successfully",
            success:true,
            task
        })

    } catch(error) {
        console.log("Error in deleteTask", error)
        res.status(500).json({
            message:`Unexpected error in deleting task: ${error.message}`,
            success:false
        })
    }
}