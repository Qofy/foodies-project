'use server'

import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals"

export async function handleSubmission(formData){
    const formDatas= {
      title: formData.get("title"),
      creator: formData.get("name"),
      creator_email: formData.get("email"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image")

    }
    await saveMeal(formDatas);
    redirect('/meals')
  }