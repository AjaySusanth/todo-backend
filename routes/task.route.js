import express from 'express'
import { checkAuth } from '../middleware/checkAuth.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasks retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       task:
 *                         type: string
 *                         example: "Complete the report"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *      
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error in retrieving tasks: [error details]"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.get('/tasks',checkAuth,getTasks)


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *             properties:
 *               task:
 *                 type: string
 *                 description: The description of the task
 *                 example: "Complete the assignment"
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 description: The current status of the task
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the task
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who created the task
 *                     task:
 *                       type: string
 *                       description: The description of the task
 *                     status:
 *                       type: string
 *                       enum: [pending, completed]
 *                       description: The status of the task
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the task was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the task was last updated
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task is required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error in creating task: [error details]"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/tasks',checkAuth,createTask)


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 description: The updated description of the task
 *                 example: "Update project report"
 *               status:
 *                 type: string
 *                 enum: [completed, pending]
 *                 description: The updated status of the task
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 task:
 *                   type: object
 *                   properties:
 *                     task:
 *                       type: string
 *                       description: The updated task description
 *                       example: "Update project report"
 *                     status:
 *                       type: string
 *                       enum: [completed, pending]
 *                       description: The updated task status
 *                       example: "completed"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid status. Allowed values are 'completed' or 'pending'."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error in updating task: [error details]"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.put('/tasks/:id',checkAuth,updateTask)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 task:
 *                   type: object
 *                   description: The deleted task details
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error in deleting task: [error details]"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.delete('/tasks/:id',checkAuth,deleteTask)

export default router