import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
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
        <Layout title={recipe ? recipe.title : undefined } description={recipe ? recipe.description : undefined } image={recipe ? recipe.image_url : undefined }>
            {recipe && (
                <main>
                    {recipe.image_url && (
                        <img src={recipe.image_url} alt="レシピ画像" width="100%"/>
                    )}

                    <h2>{recipe.title}</h2>

                    <div>
                        {recipe.author.user_name}
                        
                    </div>
                    <div>
                        {recipe.published_at}
                    </div>

                    <p>{recipe.description}</p>

                    <h3>材料</h3>
                    <ul>
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i}>
                                {ing.name}: {ing.quantity}
                            </li>
                        ))}
                    </ul>

                    <h3>手順</h3>
                    <ol>
                        {recipe.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </main>
            )}
        </Layout>
    )
}

export default RecipePage;