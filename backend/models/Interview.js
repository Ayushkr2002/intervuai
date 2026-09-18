import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    interviewType: {
      type: String,
      required: true,
      enum: ["technical", "behavioral", "mixed"],
    },

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        feedback: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    overallScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;