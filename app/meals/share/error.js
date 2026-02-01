"use client"
export default function Error({error}){
  return(
    <main className="error">
    <h1>An error Occured!</h1>
    <p>invalid Input{error.message}</p>
    </main>
  )
}