"use client"
export default function Error({error}){
  return(
    <main className="error">
    <h1>An error Occured!</h1>
    <p>Failed to fetch meal data. Please tty again later{error}</p>
    </main>
  )
}