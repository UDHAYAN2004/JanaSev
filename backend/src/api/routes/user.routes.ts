import express from "express"
import { getProfile,totalUsers,updateProfile } from "../controllers/user.controller"
import { userValidator } from "../../validators/rules/user.validators"
import { validate } from "../../validators/validate"
import { verifyToken } from "../middlewares/verifyToken"

const router=express.Router()


router.get('/profile/:id',verifyToken,getProfile)
router.put('/update-profile',userValidator.profileValidator,validate,verifyToken,updateProfile)

// for Admin Access
router.get('/admin/user-count/by-state',verifyToken,/* isAdmin, */totalUsers)

export default router