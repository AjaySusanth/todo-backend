import jwt from 'jsonwebtoken'

export const checkAuth = (req,res,next)=>{
    const token = req.cookies?.token;
    if(!token) {
        return res.status(401).json({
            message:"No token found, Please login",
            success:false
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({
                message:"Invalid token, Please login",
                success:false
            })
        }
        req.userId = decoded.userId
        next()
    } catch(error) {
        console.log("Error in checkAuth",error)
        res.status(500).json({
            message:"Unexpected Error in checking authentication",
            success:false
        })
    }
}