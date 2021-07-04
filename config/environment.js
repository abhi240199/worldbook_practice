const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "/assets",
  session_cookie_key: "wbpractice",
  db: "WB_Practice",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ap8209655@gmail.com",
      pass: "8090939516",
    },
  },
  google_client_id:
    "328772627959-34ilumvpdifo5233bu4q01j29qru837o.apps.googleusercontent.com",
  google_client_secret: "RVUqPzs8uVFW3oyM7fd31LLn",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "worldbook",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};
const production = {
  name: "production",
  asset_path: process.env.WBP_ASSET_PATH,
  session_cookie_key: process.env.WBP_SESSION_COOKIE_KEY,
  db: process.env.WBP_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.WBP_GMAIL_USERNAME,
      pass: process.env.WBP_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.WBP_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.WBP_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.WBP_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.WBP_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.WBP_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.WBP_ENVIRONMENT);
