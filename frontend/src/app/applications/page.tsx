"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { URL } from "@/helpers/url";
import { useAlert } from "@/providers/AlertProvider";
import { Activity, useEffect, useMemo, useState } from "react";
import EmptyGif from '../../../public/Gif3.gif';
import Image from "next/image";
import { EllipsisVerticalIcon, Pencil, Trash } from "lucide-react";
import { EditApplicationModal } from "@/components/EditApplicationModal";
import { StatusBadge } from "@/components/StatusBadge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TechnicalStageBadge } from "@/components/TechStageBadge";
import { CreateApplicationModal } from "@/components/CreateApplicationModal";
import { DeleteApplicationModal } from "@/components/DeleteApplicationModal";
import { ApplicationTableSkeleton } from "@/components/ApplicationTableSkeleton";

export type ApplicationStatus =
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "HIRED";

export type TechnicalStage =
  | "NONE"
  | "TECHNICAL_INTERVIEW"
  | "TECHNICAL_TEST"
  | "LIVE_CODING"
  | "SYSTEM_DESIGN";

type JobCategory = "TECH" | "NON_TECH";
type Seniority = "NONE" | "JUNIOR" | "MID" | "SENIOR";
type SortOrder = "NEWEST" | "OLDEST" | "SALARY_ASC" | "SALARY_DESC";

export interface Application {
  id: string;
  companyName: string;
  role: string;
  jobDescription?: string;
  jobCategory: JobCategory;
  seniority: Seniority;
  salary?: number;
  status: ApplicationStatus;
  technicalStage: TechnicalStage;
  createdAt: string;
  updatedAt: string;
}

export const JOB_CATEGORIES: JobCategory[] = ["TECH", "NON_TECH"];
export const SENIORITIES: Seniority[] = ["NONE", "JUNIOR", "MID", "SENIOR"];
export const APPLICATION_STATUS: ApplicationStatus[] = [
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "HIRED",
];
export const TECHNICAL_STAGES: TechnicalStage[] = [
  "NONE",
  "TECHNICAL_INTERVIEW",
  "TECHNICAL_TEST",
  "LIVE_CODING",
  "SYSTEM_DESIGN",
];

export default function Page() {
  const { user, authLoading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationToEdit, setApplicationToEdit] = useState<Application | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<JobCategory | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NEWEST");
  const [isFetching, setIsFetching] = useState(true);
  const { setAlert } = useAlert();

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "ALL") {
      result = result.filter(app => app.status === statusFilter);
    }

    if (categoryFilter !== "ALL") {
      result = result.filter(app => app.jobCategory === categoryFilter);
    }

    switch (sortOrder) {
      case "NEWEST":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      case "OLDEST":
        result.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case "SALARY_ASC":
        result.sort((a, b) => (a.salary ?? 0) - (b.salary ?? 0));
        break;

      case "SALARY_DESC":
        result.sort((a, b) => (b.salary ?? 0) - (a.salary ?? 0));
        break;
    }

    return result;
  }, [applications, statusFilter, categoryFilter, sortOrder]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        setIsFetching(true);

        const res = await fetch(`${URL}/applications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch {
        setAlert({
          type: "error",
          message: "Failed to load your applications.",
        });
      } finally {
        setIsFetching(false);
      }
    }

    if (user && token) {
      fetchApplications();
    }
  }, [user, setAlert, token]);

  if (authLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="text-cyan-950">
      <h1 className="text-4xl font-bold mb-10">Applications</h1>
      <div className="space-y-4 sm:flex sm:justify-between mb-5 items-center">
        {/* filter */}
        <div className="justify-between flex sm:justify-left gap-4 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "ALL")}
            className="w-full sm:w-fit border border-cyan-950 rounded px-3 py-2 cursor-pointer font-bold"
          >
            <option value="ALL">All status</option>
            {APPLICATION_STATUS.map(status => (
              <option
                key={status}
                value={status}
                className="cursor-pointer">
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as JobCategory | "ALL")}
            className="border w-full sm:w-fit border-cyan-950 rounded px-3 py-2 cursor-pointer font-bold"
          >
            <option value="ALL">All categories</option>
            {JOB_CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="cursor-pointer">
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="border w-full sm:w-fit border-cyan-950 rounded px-3 py-2 cursor-pointer font-bold"
          >
            <option value="NEWEST" className="cursor-pointer">Most recent</option>
            <option value="OLDEST" className="cursor-pointer">Oldest</option>
            <option value="SALARY_DESC" className="cursor-pointer">Highest salary</option>
            <option value="SALARY_ASC" className="cursor-pointer">Lowest salary</option>
          </select>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-cyan-950 w-full sm:w-fit hover:bg-cyan-800 text-white transition-all duration-300 cursor-pointer 
            font-bold px-5 py-3 rounded-full hover:-translate-y-1 w-fit">
          Add application
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-cyan-100">
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Company name</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Role</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Job description</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Category</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Seniority</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Salary</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Status</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Tech stage</TableHead>
            <TableHead className="text-base text-cyan-950 font-bold transition-all duration-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[300px] overflow-y-auto">
          {isFetching ? (
            <ApplicationTableSkeleton />
          ) : (
            filteredApplications.length === 0 ?
              <TableRow>
                <TableCell colSpan={9}>
                  <div className="flex flex-col items-center space-y-4 py-10">
                    <Image
                      src={EmptyGif}
                      alt="No applications"
                      width={150}
                      height={150}
                    />
                    <h2 className="text-xl font-bold">
                      You have no registered applications
                    </h2>
                  </div>
                </TableCell>
              </TableRow>
              :
              (filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="max-w-[100px] overflow-x-hidden">{application.companyName}</TableCell>
                  <TableCell className="max-w-[100px] overflow-x-hidden">{application.role}</TableCell>
                  <TableCell className="max-w-[300px] overflow-x-hidden">{application.jobDescription}</TableCell>
                  <TableCell>{application.jobCategory}</TableCell>
                  <TableCell>{application.seniority}</TableCell>
                  <TableCell>{application.salary ? `$ ${application.salary}` : "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell>
                    {application.jobCategory === 'TECH' ? (
                      <TechnicalStageBadge technicalStage={application.technicalStage} />
                    ) : (
                      <TechnicalStageBadge technicalStage={'NONE'} />
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="h-ful w-full bg-transparent"
                        >
                          <EllipsisVerticalIcon
                            className="text-cyan-950 hover:text-cyan-800 transition-all duration-300 cursor-pointer"
                            size={16}
                          />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <button
                            onClick={() => setApplicationToEdit(application)}
                            className="h-ful w-full text-cyan-950 flex justify-around"
                          >
                            Edit
                            <Pencil size={16} />
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => setDeleteId(application.id)}
                            className="h-ful w-full text-cyan-950 flex justify-around"
                          >
                            Delete
                            <Trash size={16} />
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))))
          }
        </TableBody>
      </Table>

      {applicationToEdit && (
        <EditApplicationModal application={applicationToEdit} applications={applications} setApplications={setApplications} setApplicationToEdit={setApplicationToEdit} token={token} />
      )}

      {openCreateModal && (
        <CreateApplicationModal openCreateModal={openCreateModal} token={token} setApplications={setApplications} setOpenCreateModal={setOpenCreateModal} />
      )}

      <Activity mode={deleteId === "" ? "hidden" : "visible"}>
        <DeleteApplicationModal token={token} id={deleteId} setApplications={setApplications} setDeleteId={setDeleteId} />
      </Activity>
    </section>
  );
}