import { useEffect, useState } from "react";
import { RecipeBox } from "../components/RecipeBox";
import { getRecipes, Recipe } from "../lib/recipe";
import Link from "next/link";
import { Header } from "../components/Header";


function Home() {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);

    useEffect(() => {
        (async () => {
            const recipes = await getRecipes();
            setRecipes(recipes);
        })();
    }, []);

    if (recipes === null) return <div>loading...</div>;

    return (
        <div>
            <Header />
            {recipes.map((recipe) => (
                <Link href={`/recipes/${recipe.id}`}>
                    <div>
                        <RecipeBox recipe={recipe} key={recipe.id} />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Home;