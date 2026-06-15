import axios from "axios";

const api = axios.create({
  baseURL: "https://interview-ai-backend-2-zvpg.onrender.com",
  withCredentials: true,
});

// Safe error handler (optional but useful)
const handleError = (err) => {
  return err?.response?.data?.message || err.message || "API Error";
};

/**
 * Generate interview report
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription || "");
    formData.append("selfDescription", selfDescription || "");

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const response = await api.post("/api/interview/", formData);

    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

/**
 * Get single interview report
 */
export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(
      `/api/interview/report/${interviewId}`
    );

    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

/**
 * Get all reports
 */
export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview/");
    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

/**
 * Download resume PDF
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  try {
    const response = await api.post(
      `/api/interview/resume/pdf/${interviewReportId}`,
      null,
      { responseType: "blob" }
    );

    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

