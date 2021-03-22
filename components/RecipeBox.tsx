import { FC } from "react";
import { Recipe } from "../lib/recipe";

type Props = {
    recipe: Recipe;
}

export const RecipeBox: FC<Props> = (props) => {
    return (
        <div>
            {props.recipe.image_url && <img className="recipeImage" src={props.recipe.image_url} width="100%" />}
            
            <h3>{props.recipe.title}</h3>

            <div>{props.recipe.description}</div>
        </div>
    );
};
