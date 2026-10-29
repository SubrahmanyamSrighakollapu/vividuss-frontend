"use server";
import { serverApiUrl } from "@/lib/api-url.mjs";


import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createWebsite(formData) {
  const { getToken } = await auth();
  const token = await getToken();


  
  const templateId = formData.get("templateId");
  const name = formData.get("name");

  if (!templateId || !name) {
    throw new Error("Template ID and website name are required");
  }

  const response = await fetch(
    `${serverApiUrl(`websites`)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        templateId,
        name,
      }),
    }
  );

  // DEBUG: read the raw response first
  const rawResponse = await response.text();




  if (!response.ok) {
    throw new Error(
      `Failed to create website. Status: ${response.status}`
    );
  }

  const result = JSON.parse(rawResponse);

  const websiteId = result.data.id;

  redirect(`/builder/${websiteId}`);
}