'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache";

function isInvalid(text){
  return !text || text.trim() === ""; 
};

export async function handleSubmission(prevSate,formData){
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
        return {message: "Invalid Input"}
       }
    await saveMeal(formDatas);
    revalidatePath("/meal")
    redirect('/meals')
  }