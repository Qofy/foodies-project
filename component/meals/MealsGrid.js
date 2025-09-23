import classes from "./meals-grid.module.css"
import MealItem from "./MealsItem"

export default function MealsGrid({maels}){
  return(
    <ul className={classes.maeals}>
      {maels.map((meal)=>(
        <li key={meal.id}>
          <MealItem {...meal}/>
        </li>
      ))}
    </ul>
  )
}