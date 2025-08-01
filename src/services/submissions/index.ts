"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllSubmissions = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/submission/assignment/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Submissions"],
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (err: any) {
    return Error(err);
  }
};

export const feedBackSubmission = async (payload: FieldValues, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/submission/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    revalidateTag("Submissions");

    return result;
  } catch (err: any) {
    return Error(err);
  }
};

export const createSubmission = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    revalidateTag("StudentSubmissions");

    return result;
  } catch (err: any) {
    return Error(err);
  }
};

export const getMySubmissions = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/submission/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["StudentSubmissions"],
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (err: any) {
    return Error(err);
  }
};
