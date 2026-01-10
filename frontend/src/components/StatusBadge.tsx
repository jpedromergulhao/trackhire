import { ApplicationStatus } from "@/app/applications/page";

interface StatusBadgeProps {
    status: ApplicationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const STATUS_STYLES: Record<ApplicationStatus, string> = {
        APPLIED: "bg-yellow-200 text-yellow-900",
        INTERVIEW: "bg-blue-200 text-blue-900",
        OFFER: "bg-green-200 text-green-900",
        REJECTED: "bg-red-200 text-red-900",
        HIRED: "bg-emerald-200 text-emerald-900",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_STYLES[status]}`}>
            {status.replaceAll("_", " ")}
        </span>
    );
}