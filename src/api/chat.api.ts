import APIConfig from "./api.config";

export const sendUserMessage = async (userId: string, message: string) => {
  const res = await APIConfig.post("/api/chat/send", { userId, message });
  return res.data.data;
};

export const getPendingThreads = async () => {
  const res = await APIConfig.get("/api/chat/staff/pending");
  return res.data.data;
};