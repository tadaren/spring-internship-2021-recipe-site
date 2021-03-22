import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { getRecipe, Recipe } from "../../lib/recipe";

type Props = {
    recipe: Recipe;
}

const RecipePage: NextPage<Props> = (props) => {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        (async () => {
            const id = Number(router.query.id);
            if(id === 0 || isNaN(id)){
                setRecipe(null);
            }else{
                const recipe = await getRecipe(id);
                setRecipe(recipe);
            }
        })();
    }, [router.query.id]);

    return (
        <div>
            <Header />
            {recipe && (
                <main>
                    <h2>{recipe.title}</h2>

                    {recipe.image_url && (
                        <img src={recipe.image_url} alt="レシピ画像" width="100%"/>
                    )}

                    <p>{recipe.description}</p>

                    <h3>材料</h3>
                    <ol>
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i}>
                                {ing.name}: {ing.quantity}
                            </li>
                        ))}
                    </ol>

                    <h3>手順</h3>
                    <ol>
                        {recipe.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </main>
            )}
        </div>
    )
}

export default RecipePage;