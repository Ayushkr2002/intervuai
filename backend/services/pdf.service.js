import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  try {
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    await parser.destroy();

    if (!result.text || !result.text.trim()) {
      throw new Error("Could not extract text from PDF");
    }

    return result.text.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF");
  }
};