"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllAssignments = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/assignment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["Assignments"],
      },
    });

    const result = await res.json();

    return result;
  } catch (err: any) {
    return Error(err);
  }
};

export const createAssignment = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/assignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    revalidateTag("Assignments");

    return result;
  } catch (err: any) {
    return Error(err);
  }
};
