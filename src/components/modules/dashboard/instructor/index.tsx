"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getStatsData } from "@/services/instructor";

const chartConfig: ChartConfig = {
  pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  reviewed: {
    label: "Reviewed",
    color: "var(--chart-2)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--chart-3)",
  },
};

interface SubmissionStat {
  status: keyof typeof chartConfig;
  count: number;
}

const ChartData = () => {
  const [data, setData] = useState<SubmissionStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getStatsData();

        if (res?.success) {
          const processed = res?.data?.map((item: SubmissionStat) => ({
            ...item,
            fill: chartConfig[item.status].color,
          }));

          setData(processed);
        } else {
          setError(res?.message || "Error loading data");
        }
      } catch (err: any) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Submission Stats</CardTitle>
        <CardDescription>Submissions grouped by status</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="flex justify-center items-center h-[200px] text-muted">
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent nameKey="status" hideLabel={false} />
                }
              />
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={150}
              >
                <LabelList
                  dataKey="status"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartData;
