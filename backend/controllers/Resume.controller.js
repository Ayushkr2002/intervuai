import cloudinary from "../config/cloudinary.js";
import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../services/pdf.service.js";
import { analyzeResume } from "../services/gemini.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF resume is required",
      });
    }
    const resumeText = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeResume(resumeText);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "intervuai/resumes",
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      analysis,
    });

    res.status(201).json({
      message: "Resume analyzed successfully",
      resume,
      
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      message: "Resume upload failed",
    });
  }
};
export const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found",
      });
    }

    res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      message: "Failed to fetch resume",
    });
  }
};

export const deleteMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await cloudinary.uploader.destroy(resume.cloudinaryPublicId, {
      resource_type: "raw",
    });

    await Resume.deleteOne({
      _id: resume._id,
    });

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    res.status(500).json({
      message: "Failed to delete resume",
    });
  }
};