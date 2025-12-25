import { Request,Response } from "express";
import { AuthRequest } from "../middlewares/verifyToken";
import { Review } from "../../models/review";

export const createReview= async(req:AuthRequest, res:Response)=>{
    try {
        const {user_id,schema_id,ratings,comments}=req.body
        
    } catch (error) {
        
    }
}