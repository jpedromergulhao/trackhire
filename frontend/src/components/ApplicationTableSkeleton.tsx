import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export function ApplicationTableSkeleton() {
    return (
        <TableRow className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <TableCell
                    key={i}
                    className="grid grid-cols-9 gap-4 items-center w-screen!"
                >
                    <Skeleton className="h-4 bg-cyan-200/70" />
                    <Skeleton className="h-4 bg-cyan-200/70" />
                    <Skeleton className="h-4 bg-cyan-200/70 col-span-2" />
                    <Skeleton className="h-4 bg-cyan-200/70" />
                    <Skeleton className="h-4 bg-cyan-200/70" />
                    <Skeleton className="h-4 bg-cyan-200/70" />
                    <Skeleton className="h-4 bg-cyan-300/70 rounded-full" />
                    <Skeleton className="h-4 bg-cyan-300/70 rounded-full" />
                    <Skeleton className="h-6 w-6 bg-cyan-300 rounded-full" />
                </TableCell>
            ))}
        </TableRow>
    );
}
