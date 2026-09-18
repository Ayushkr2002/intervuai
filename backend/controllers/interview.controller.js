import Interview from "../models/Interview.js";
import {
  generateInterviewQuestion,
  evaluateInterviewAnswer,
} from "../services/gemini.service.js";

export const createInterview = async (req, res) => {
  try {
    const { jobRole, experience, interviewType } = req.body;

    if (!jobRole || !experience || !interviewType) {
      return res.status(400).json({
        message:
          "Job role, experience and interview type are required.",
      });
    }

    const interview = await Interview.create({
      user: req.user._id,
      jobRole,
      experience,
      interviewType,
    });

    return res.status(201).json({
      message: "Interview created successfully.",
      interview,
    });
  } catch (error) {
    console.error("Create interview error:", error);

    return res.status(500).json({
      message: "Failed to create interview.",
    });
  }
};

export const generateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    if (interview.questions.length >= 5) {
  return res.status(400).json({
    message: "Interview has reached the maximum number of questions.",
  });
}

    const previousQuestions = interview.questions.map(
      (item) => item.question
    );

    const question = await generateInterviewQuestion({
      jobRole: interview.jobRole,
      experience: interview.experience,
      interviewType: interview.interviewType,
      previousQuestions,
    });

    interview.questions.push({
      question,
    });

    interview.status = "in-progress";

    await interview.save();

    const newQuestion =
      interview.questions[interview.questions.length - 1];

    return res.status(200).json({
      message: "Question generated successfully.",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Generate interview question error:", error);

    return res.status(500).json({
      message: "Failed to generate interview question.",
    });
  }
};
export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    if (!answer?.trim()) {
      return res.status(400).json({
        message: "Answer is required.",
      });
    }

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    if (interview.questions.length === 0) {
      return res.status(400).json({
        message: "No interview question exists.",
      });
    }

    const currentQuestion =
      interview.questions[interview.questions.length - 1];

      if (currentQuestion.answer) {
  return res.status(400).json({
    message: "This question has already been answered.",
  });
}

    const evaluation = await evaluateInterviewAnswer({
      question: currentQuestion.question,
      answer,
      jobRole: interview.jobRole,
      experience: interview.experience,
      interviewType: interview.interviewType,
    });

    currentQuestion.answer = answer;
currentQuestion.feedback = evaluation.feedback;
currentQuestion.score = evaluation.score;

if (interview.questions.length === 5) {
  interview.status = "completed";

  const totalScore = interview.questions.reduce(
    (total, question) => total + question.score,
    0
  );

  interview.overallScore = Number(
    (totalScore / interview.questions.length).toFixed(1)
  );
}

await interview.save();



    return res.status(200).json({
  message: "Answer evaluated successfully.",
  evaluation,
  question: currentQuestion,
  interview: {
    status: interview.status,
    overallScore: interview.overallScore,
    questionCount: interview.questions.length,
    isCompleted: interview.status === "completed",
  },
});
  } catch (error) {
    console.error("Submit answer error:", error);

    return res.status(500).json({
      message: "Failed to evaluate answer.",
    });
  }
};
export const getInterviewStats = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    const totalInterviews = interviews.length;

    const completedInterviews = interviews.filter(
      (interview) => interview.status === "completed"
    );

    const completedCount = completedInterviews.length;

    const averageScore =
      completedCount > 0
        ? Number(
            (
              completedInterviews.reduce(
                (total, interview) => total + (interview.overallScore || 0),
                0
              ) / completedCount
            ).toFixed(1)
          )
        : 0;

    const bestScore =
      completedCount > 0
        ? Math.max(
            ...completedInterviews.map(
              (interview) => interview.overallScore || 0
            )
          )
        : 0;

    const recentInterviews = interviews.slice(0, 5).map((interview) => ({
      _id: interview._id,
      jobRole: interview.jobRole,
      experience: interview.experience,
      interviewType: interview.interviewType,
      status: interview.status,
      overallScore: interview.overallScore || 0,
      questionCount: interview.questions?.length || 0,
      createdAt: interview.createdAt,
    }));

    return res.status(200).json({
      stats: {
        totalInterviews,
        completedCount,
        averageScore,
        bestScore,
      },
      recentInterviews,
    });
  } catch (error) {
    console.error("Get interview stats error:", error);

    return res.status(500).json({
      message: "Failed to fetch interview statistics.",
    });
  }
};