import "dotenv/config";
import { google } from "googleapis";
import { config } from "../config/config.js";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const {
  projectId,
  privateKeyId,
  privateKey,
  clientEmail,
  clientId,
} = config.google;

if (
  !projectId ||
  !privateKeyId ||
  !privateKey ||
  !clientEmail ||
  !clientId
) {
  throw new Error("Missing required Google service account environment variables.");
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: projectId,
    private_key_id: privateKeyId,
    private_key: privateKey.replace(/\\n/g, "\n"),
    client_email: clientEmail,
    client_id: clientId,
  },
  scopes: SCOPES,
});

export const sheets = google.sheets({ version: "v4", auth });
