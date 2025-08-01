"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { CalendarDaysIcon, FileTextIcon, Plus } from "lucide-react";
import { getAllAssignments } from "@/services/assignments";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Assignment = {
  _id: string;
  title: string;
  description: string;
  deadline: string;
};

const Assignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await getAllAssignments();
        if (res?.success) {
          setAssignments(res?.data);
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex-1">📚 Assignments</h1>
        <Link href="/instructor/assignments/create">
          <Button>
            <Plus className="w-4 h-4" />
            Add Assignment
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <Card key={idx} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-5 w-1/3 mb-2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))
        ) : assignments.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No assignments available.
          </div>
        ) : (
          assignments.map((assignment) => (
            <Card
              key={assignment._id}
              className="transition-all hover:shadow-lg border border-gray-200"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <FileTextIcon className="w-5 h-5 text-blue-500" />
                  {assignment.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>{assignment.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDaysIcon className="w-4 h-4" />
                  Deadline:{" "}
                  <span className="font-medium text-red-500">
                    {new Date(assignment.deadline).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
