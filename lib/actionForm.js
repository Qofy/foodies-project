'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"

function isInvalid(text){
  return !text || text.trim() === ""; 
};

export async function handleSubmission(formData){
    const formDatas= {
      title: formData.get("title"),
      creator: formData.get("name"),
      creator_email: formData.get("email"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image")

    }

    if (isInvalid(formDatas.creator)
      ||isInvalid(formDatas.creator_email) 
      || isInvalid(formDatas.image) 
      || isInvalid(formDatas.instructions)
       || isInvalid(formDatas.summary)
      || isInvalid(formDatas.title)
       || !formDatas.creator_email.includes("@")
       || !formDatas.image || formDatas.image.size === 0
       ){
        throw new Error("invalid input")
       }
    await saveMeal(formDatas);
    redirect('/meals')
  }