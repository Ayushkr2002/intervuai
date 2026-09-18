import express from "express";

import {
  createInterview,
  generateQuestion,
  submitAnswer,
  getInterviewStats,
} from "../controllers/interview.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Interview routes are working",
  });
});

router.post("/create", protect, createInterview);
router.get("/stats", protect, getInterviewStats);
router.post("/:id/question", protect, generateQuestion);
router.post("/:id/answer", protect, submitAnswer);

export default router;