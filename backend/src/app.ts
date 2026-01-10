import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import applicationsRouter from './routes/application.routes';
import healthRoutes from './routes/health.routes';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://trackhire-red.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/applications', applicationsRouter);
app.use("/health", healthRoutes);

export default app;