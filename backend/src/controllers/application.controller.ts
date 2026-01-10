import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ApplicationStatus, JobCategory, Seniority, TechnicalStage } from '@prisma/client';

export async function listApplications(req: AuthRequest, res: Response) {
    const userId = req.userId;

    const applications = await prisma.application.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });

    return res.json(applications);
}

export async function createApplication(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const {
            companyName,
            role,
            jobDescription,
            jobCategory,
            seniority,
            salary,
            technicalStage,
            status,
        } = req.body;

        if (!companyName || !role || !jobCategory || !seniority) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        if (!Object.values(JobCategory).includes(jobCategory)) {
            return res.status(400).json({ message: "Invalid job category." });
        }

        if (!Object.values(Seniority).includes(seniority)) {
            return res.status(400).json({ message: "Invalid seniority." });
        }

        if (status && !Object.values(ApplicationStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid status." });
        }

        if (
            technicalStage &&
            !Object.values(TechnicalStage).includes(technicalStage)
        ) {
            return res.status(400).json({ message: "Invalid technical stage." });
        }

        if (jobCategory === "NON_TECH" && technicalStage && technicalStage !== "NONE") {
            return res.status(400).json({
                message: "Non tech applications cannot have technical stages.",
            });
        }

        if (jobCategory === "TECH" && !technicalStage) {
            return res.status(400).json({
                message: "Tech applications must have a technical stage.",
            });
        }

        const application = await prisma.application.create({
            data: {
                userId,
                companyName,
                role,
                jobDescription,
                jobCategory,
                seniority,
                salary,
                status: status ?? "APPLIED",
                technicalStage: technicalStage ?? "NONE",
            },
        });

        return res.status(201).json(application);
    } catch (error) {
        console.error("Create application error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function editApplication(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const data = req.body;

        const application = await prisma.application.findFirst({
            where: { id, userId },
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }

        if (!Object.values(JobCategory).includes(data.jobCategory)) {
            return res.status(400).json({ message: "Invalid job category." });
        }

        if (!Object.values(Seniority).includes(data.seniority)) {
            return res.status(400).json({ message: "Invalid seniority." });
        }

        if (data.status && !Object.values(ApplicationStatus).includes(data.status)) {
            return res.status(400).json({ message: "Invalid status." });
        }

        if (
            data.technicalStage &&
            !Object.values(TechnicalStage).includes(data.technicalStage)
        ) {
            return res.status(400).json({ message: "Invalid technical stage." });
        }

        if (data.jobCategory === "NON_TECH" && data.technicalStage && data.technicalStage !== "NONE") {
            return res.status(400).json({
                message: "Non tech applications cannot have technical stages.",
            });
        }

        if (data.jobCategory === "TECH" && !data.technicalStage) {
            return res.status(400).json({
                message: "Tech applications must have a technical stage.",
            });
        }

        const updated = await prisma.application.update({
            where: { id },
            data,
        });

        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteApplication(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id) {
            return res.status(400).json({ message: "Application id is required." });
        }

        const application = await prisma.application.findFirst({
            where: { id, userId },
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        await prisma.application.delete({
            where: { id },
        });

        return res.status(204).send();
    } catch (error) {
        console.error("Delete application error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}