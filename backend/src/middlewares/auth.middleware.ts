import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}