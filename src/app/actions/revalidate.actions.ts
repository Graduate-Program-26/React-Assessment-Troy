"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateProfile(username: string) {
    revalidatePath(`/dashboard/${username}`);
}

export async function revalidateDashboard(username: string) {
    revalidateTag(`profile-${username}`, "default");
    revalidateTag(`repos-${username}`, "default");
    revalidateTag(`activity-${username}`, "default");
}
