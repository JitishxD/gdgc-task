import express from "express";
const router = express.Router();

import { registerMember, getMembers, getMemberById } from "./memberController.js";

router.post("/registerMember", registerMember);
router.get("/getMembers", getMembers);
router.get("/getMember/:id", getMemberById);

export default router;
