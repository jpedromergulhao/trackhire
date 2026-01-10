import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../utils/jwt';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name, desiredJob, desiredSalary } = req.body;

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'There is already a user using this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                desiredJob,
                desiredSalary,
            },
        });

        const token = signToken({ userId: user.id });

        return res.status(201).json({ token });
    } catch (error) {
        console.error('Register api error: ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(401).json({ message: 'There is no account associated with this email.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const token = signToken({ userId: user.id });

        return res.json({ token });
    } catch (error) {
        console.error('Login api error: ', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export async function me(req: AuthRequest, res: Response) {
  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      desiredJob: true,
      desiredSalary: true,
      profilePicture: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
}
