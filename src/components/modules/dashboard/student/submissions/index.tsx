"use client";

import { useEffect, useState } from "react";
import { CalendarDaysIcon, LinkIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllSubmissions, getMySubmissions } from "@/services/submissions";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/auth";
import Link from "next/link";

export enum SubmissionStatus {
  PENDING = "pending",
  REVIEWED = "reviewed",
  REJECTED = "rejected",
}

export interface AssignmentSubmission {
  _id: string;
  assignment: {
    _id: string;
    title: string;
    description: string;
    deadline: string;
  };
  student: string;
  submissionUrl: string;
  note: string;
  status: SubmissionStatus;
  submittedAt: string;
  feedback: string;
}

const AllSubmissions = ({ id }: { id: string }) => {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const res = await getMySubmissions(id);
      setSubmissions(res?.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!loading && submissions?.length === 0) {
    return (
      <div className="h-16 flex justify-center items-center">
        <p className="text-xl text-muted-foreground">No submissions found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {submissions.map((submission) => (
        <Card key={submission._id} className="border border-muted/30">
          <CardHeader>
            <CardTitle>
              <strong>Assignment:</strong> {submission.assignment.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>
                Submitted:{" "}
                {new Date(submission.submittedAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Note:</strong> {submission.note}
            </p>
            <p className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-500" />
              <Link
                href={submission.submissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                View Submission
              </Link>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge
                variant={
                  submission.status === SubmissionStatus.REVIEWED
                    ? "default"
                    : submission.status === SubmissionStatus.REJECTED
                    ? "destructive"
                    : "secondary"
                }
              >
                {submission.status.toLocaleUpperCase()}
              </Badge>
            </p>
            {submission?.feedback && (
              <p>
                <strong>Feedback: </strong>
                {submission.feedback}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllSubmissions;
