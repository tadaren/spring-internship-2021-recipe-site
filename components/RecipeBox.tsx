import { FC } from 'react';
import { Recipe } from '../lib/recipe';

type Props = {
    recipe: Recipe;
};

export const RecipeBox: FC<Props> = (props) => {
    return (
        <div className="recipe-box">
            <div className="recipe-box-image">
                {props.recipe.image_url && (
                    <img
                        className="recipe-image"
                        src={props.recipe.image_url}
                        alt="レシピ画像"
                    />
                )}
            </div>

            <div>
                <h3>{props.recipe.title}</h3>

                <div>{props.recipe.description}</div>
            </div>
        </div>
    );
};
