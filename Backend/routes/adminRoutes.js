import express from "express";
import User from "../models/User.model.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

export default router;
