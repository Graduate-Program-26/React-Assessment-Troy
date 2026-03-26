"use server";

import { signIn, signOut } from "@/src/auth";

export async function githubSignIn() {
    await signIn("github");
}

export async function handleSignOut() {
    await signOut();
}
