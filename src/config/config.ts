import "dotenv/config";

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  google: {
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKeyId: process.env.GOOGLE_PRIVATE_KEY_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  spreadsheet: {
    id: process.env.SPREADSHEET_ID
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  isProd: process.env.NODE_ENV === "production",
};
