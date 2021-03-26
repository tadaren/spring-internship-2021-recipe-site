import Link from 'next/link';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecipeBox } from '../components/RecipeBox';
import {
    getRecipes,
    getRecipesById,
    Recipe,
    searchRecipe,
} from '../lib/recipe';
import { Layout } from '../components/Layout';
import { Paging } from '../components/Paging';
import { allBookmarks } from '../lib/bookmark';

export const Home: NextPage = () => {
    const router = useRouter();
    const [prevURL, setPrevURL] = useState<string | null>(null);
    const [nextURL, setNextURL] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const currentPageNumber =
        typeof router.query.page === 'string' ? Number(router.query.page) : 1;

    useEffect(() => {
        (async () => {
            const bookmarkedIDs = await allBookmarks();
            const startIndex = 10 * (currentPageNumber - 1);
            const endIndex = 10 * currentPageNumber;
            const res = await getRecipesById(
                bookmarkedIDs.slice(startIndex, endIndex),
            );
            setRecipes(res.recipes);
            if (startIndex > 1) {
                const searchParams = new URLSearchParams({
                    page: `${currentPageNumber - 1}`,
                });
                setPrevURL(`/bookmarks/?${searchParams}`);
            }
            if (bookmarkedIDs.length > endIndex) {
                const searchParams = new URLSearchParams({
                    page: `${currentPageNumber + 1}`,
                });
                setNextURL(`/bookmarks/?${searchParams}`);
            }
        })();
    }, []);

    return (
        <Layout>
            <div className="text-lg font-bold ml-2 border-b">
                ブックマーク一覧
            </div>
            {recipes ? (
                <>
                    {recipes.map((recipe) => (
                        <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                            <a>
                                <RecipeBox recipe={recipe} />
                            </a>
                        </Link>
                    ))}
                    <Paging prevURL={prevURL} nextURL={nextURL} />
                </>
            ) : (
                <div>ブックマークしているレシピはありません</div>
            )}
        </Layout>
    );
};

export default Home;
