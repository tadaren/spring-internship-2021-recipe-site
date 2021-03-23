import { useEffect, useState } from "react";
import { RecipeBox } from "../components/RecipeBox";
import { getRecipes, Recipe, searchRecipe } from "../lib/recipe";
import Link from "next/link";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { NextPage } from "next";


export const Home: NextPage = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [prevURL, setPrev] = useState<string | null>(null);
    const [nextURL, setNext] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const currentPageNumber = (typeof router.query.page === 'string') ? Number(router.query.page) : 1;
            if (router.query.search !== undefined && typeof router.query.search === 'string') {
                const searchRes = await searchRecipe(router.query.search, currentPageNumber);
                console.log(searchRes);
                setRecipes(searchRes.recipes);
                if (searchRes.links.prev !== undefined) {
                    const searchParams = new URLSearchParams({ search: router.query.search, page: `${currentPageNumber - 1}` });
                    setPrev(`/?${searchParams}`);
                } else {
                    setPrev(null);
                }
                if (searchRes.links.next !== undefined) {
                    const searchParams = new URLSearchParams({ search: router.query.search, page: `${currentPageNumber + 1}` });
                    setNext(`/?${searchParams}`);
                } else {
                    setNext(null);
                }
            } else {
                const result = await getRecipes(currentPageNumber);
                console.log(result);
                setRecipes(result.recipes);
                if (result.links.prev !== undefined) {
                    const searchParams = new URLSearchParams({ page: `${currentPageNumber - 1}` });
                    setPrev(`/?${searchParams}`);
                } else {
                    setPrev(null);
                }
                if (result.links.next !== undefined) {
                    const searchParams = new URLSearchParams({ page: `${currentPageNumber + 1}` });
                    setNext(`/?${searchParams}`);
                } else {
                    setNext(null);
                }
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