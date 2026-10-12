import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// ---------- schemas ----------
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const avatarSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  prompt: z.string().optional(),
});

const videoSchema = z.object({
  prompt: z.string().optional(),
  avatarId: z.string().optional(),
  modelId: z.string().optional(),
});

// ---------- helpers ----------
function handle(schema: z.ZodType<any>, handler: (data: any, req: express.Request, res: express.Response) => void) {
  return (req: express.Request, res: express.Response) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    handler(parsed.data, req, res);
  };
}

// ---------- auth ----------
app.post("/api/v1/signup", handle(signupSchema, (data, _req, res) => {
  // TODO: create user
  res.status(201).json({ message: "signup", data });
}));

app.post("/api/v1/signin", handle(signinSchema, (data, _req, res) => {
  // TODO: authenticate user
  res.status(200).json({ message: "signin", data });
}));

app.get("/api/v1/me", (_req, res) => {
  // TODO: return current user
  res.status(200).json({ message: "me" });
});

// ---------- avatars ----------
app.post("/api/v1/avatar", handle(avatarSchema, (data, _req, res) => {
  // TODO: create avatar
  res.status(201).json({ message: "create avatar", data });
}));

app.get("/api/v1/avatar/:avatarId", (req, res) => {
  // TODO: get single avatar
  res.status(200).json({ message: "get avatar", avatarId: req.params.avatarId });
});

app.get("/api/v1/avatars", (_req, res) => {
  // TODO: list avatars
  res.status(200).json({ message: "list avatars" });
});

// ---------- videos ----------
app.post("/api/v1/video", handle(videoSchema, (data, _req, res) => {
  // TODO: create video
  res.status(201).json({ message: "create video", data });
}));

app.get("/api/v1/video/:videoId", (req, res) => {
  // TODO: get single video
  res.status(200).json({ message: "get video", videoId: req.params.videoId });
});

app.get("/api/v1/videos", (_req, res) => {
  // TODO: list videos
  res.status(200).json({ message: "list videos" });
});

// ---------- models ----------
app.get("/api/v1/models", (_req, res) => {
  // TODO: list AI models
  res.status(200).json({ message: "list models" });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
