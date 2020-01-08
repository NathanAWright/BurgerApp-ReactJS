import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let transformedIngredients = Object.keys(
            props.ingredients
        ).map(
            ingredientKey => {
                return [...Array(props.ingredients[ingredientKey])].map((_,i) =>{
                    return <BurgerIngredient key={ingredientKey + i} type = {ingredientKey}/>
                })
            }
        ).reduce(//takes a function
            (arr, el) => {//takes in the previous array and the current value
                return arr.concat(el)//(for each) takes the current value and adds it to the current array
            }, []//empty array is the initial value for the "reduced" output
        );
        // console.log(transformedIngredients);
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;