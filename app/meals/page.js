import Link from "next/link"
import classes from "./page.module.css"
import MealsGrid from "@/component/meals/MealsGrid"

export default function Mealpage(){
  return (
    <>
    <header className={classes.header}>
      <h1>
        Delicious meals, created{" "}
        <span className={classes.highlight}>by you</span>
      </h1>
      <p>
        Choose your favorite recipe and cook it yourself. it is easy and fun!
      </p>
      <p className={classes.cta}>
      <Link href="/meals/share">Share your favorite Recipe</Link>
      </p>
    </header>
    <main className={classes.main}>
      <MealsGrid maels={[]}/>
    </main>
    </>
  )
}