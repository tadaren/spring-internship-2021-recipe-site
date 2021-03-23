import { useEffect, useState } from "react";
import { RecipeBox } from "../components/RecipeBox";
import { getRecipes, Recipe, searchRecipe } from "../lib/recipe";
import Link from "next/link";
import { Header } from "../components/Header";
import { useRouter } from "next/router";


function Home() {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [prevURL, setPrevURL] = useState<string | null>(null);
    const [nextURL, setNextURL] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            console.log(router.query.search);
            if (router.query.search !== undefined && typeof router.query.search === 'string') {
                const searchRes = await searchRecipe(router.query.search);
                console.log(searchRes);
                setRecipes(searchRes.recipes);
                setPrevURL(searchRes.links.prev !== undefined ? searchRes.links.prev : null);
                setNextURL(searchRes.links.next !== undefined ? searchRes.links.next : null);
            } else {
                const recipes = await getRecipes();
                setRecipes(recipes.recipes);
            }
        })();
    }, [router.query]);

    if (recipes === null) return <div>loading...</div>;

    return (
        <div>
            <Header />
            {recipes.map((recipe) => (
                <Link href={`/recipes/${recipe.id}`} key={recipe.id} >
                    <div>
                        <RecipeBox recipe={recipe} />
                    </div>
                </Link>
            ))}
            <div className="pagebox">
                <div>
                    {prevURL && (
                        <Link href={prevURL}>前のページ</Link>
                    )}
                </div>
                <div>
                    {nextURL && (
                        <Link href={nextURL}>次のページ</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;