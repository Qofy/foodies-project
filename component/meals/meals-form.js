"use client"
import { useFormStatus } from "react-dom";


export default function MealForm(){
const {pending} = useFormStatus()
return(
    <button disabled={pending}>
        {pending ? "Submitting" : "Share Meals"}
    </button>
)
}