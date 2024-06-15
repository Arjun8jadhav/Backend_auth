import express, { Router } from "express";
import { shoulbeadmin, shouldbeloggedin } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router=express.Router();

router.get("/should-be-logged-in",verifyToken,shouldbeloggedin);
router.get("/should-be-admin",shoulbeadmin);
export default router;