'use server'

export async function handleSubmission(formData){
    const formDatas= {
      title: formData.get("title"),
      creator: formData.get("name"),
      creator_email: formData.get("emal"),
      summary: formData.get("summary"),
      instruction: formData.get("instructions"),
      image: formData.get("image")

    }
    console.log(formDatas)
  }