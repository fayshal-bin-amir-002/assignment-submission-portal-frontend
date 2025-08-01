"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getStatsData = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/submission/stats/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    const result = await res.json();

    return result;
  } catch (err: any) {
    return Error(err);
  }
};
