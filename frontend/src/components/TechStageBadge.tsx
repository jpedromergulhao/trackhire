import { TechnicalStage } from "@/app/applications/page";

interface TechnicalStageBadgeProps {
  technicalStage: TechnicalStage;
}

export function TechnicalStageBadge({ technicalStage }: TechnicalStageBadgeProps) {
  const TECH_STYLES: Record<TechnicalStage, string> = {
    NONE: "bg-neutral-200 text-neutral-900",
    TECHNICAL_INTERVIEW: "bg-purple-200 text-purple-900",
    TECHNICAL_TEST: "bg-indigo-200 text-indigo-900",
    LIVE_CODING: "bg-cyan-200 text-cyan-900",
    SYSTEM_DESIGN: "bg-orange-200 text-orange-900",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${TECH_STYLES[technicalStage]}`}>
      {technicalStage.replaceAll("_", " ")}
    </span>
  );
}