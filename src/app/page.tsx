import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileText, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="max-w-5xl w-full text-center space-y-12 py-10">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Assignment Submission Portal
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A modern platform for students to submit and track assignments and
            for instructors to review, grade, and manage submissions
            effortlessly.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <Card className="hover:shadow-xl transition">
            <CardHeader className="flex items-center gap-3">
              <GraduationCap className="text-indigo-600" />
              <CardTitle className="text-xl">For Students</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-gray-700 space-y-2 text-sm">
              <ul className="list-disc list-inside">
                <li>View and submit assignments</li>
                <li>Track submission status</li>
                <li>Edit before deadline</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition">
            <CardHeader className="flex items-center gap-3">
              <FileText className="text-yellow-600" />
              <CardTitle className="text-xl">For Instructors</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-gray-700 space-y-2 text-sm">
              <ul className="list-disc list-inside">
                <li>Create and manage assignments</li>
                <li>Review student submissions</li>
                <li>Give feedback and grades</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Highlight */}
        <div className="max-w-3xl mx-auto bg-indigo-100/40 rounded-xl p-6 flex items-center gap-4 shadow-sm">
          <BarChart2 className="w-10 h-10 text-indigo-500" />
          <p className="text-gray-700 text-md">
            Instructors can also view submission insights and track student
            performance using powerful dashboards.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/student">
            <Button className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-lg">
              Enter as Student
            </Button>
          </Link>
          <Link href="/instructor">
            <Button variant="outline" className="px-6 py-3 text-lg">
              Enter as Instructor
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
