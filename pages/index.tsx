import { RecipeBox } from "../components/RecipeBox";
import { getRecipes, Recipe, searchRecipe } from "../lib/recipe";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";

type Props = {
    recipes: Recipe[];
    prevURL: string | null;
    nextURL: string | null;
}

export const Home: NextPage<Props> = (props) => {
    const { recipes, prevURL, nextURL } = props;

    return (
        <Layout>
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
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const currentPageNumber = (typeof context.query.page === 'string') ? Number(context.query.page) : 1;
    if (context.query.search !== undefined && typeof context.query.search === 'string') {
        const searchRes = await searchRecipe(context.query.search, currentPageNumber);
        let prevURL = null;
        if (searchRes.links.prev !== undefined) {
            const searchParams = new URLSearchParams({ search: context.query.search, page: `${currentPageNumber - 1}` });
            prevURL = `/?${searchParams}`;
        }
        let nextURL = null;
        if (searchRes.links.next !== undefined) {
            const searchParams = new URLSearchParams({ search: context.query.search, page: `${currentPageNumber + 1}` });
            nextURL = `/?${searchParams}`;
        }
        return {
            props: {
                recipes: searchRes.recipes,
                prevURL,
                nextURL
            }
        }
    } else {
        const result = await getRecipes(currentPageNumber);
        let prevURL = null;
        if (result.links.prev !== undefined) {
            const searchParams = new URLSearchParams({ page: `${currentPageNumber - 1}` });
            prevURL = `/?${searchParams}`;
        }
        let nextURL = null;
        if (result.links.next !== undefined) {
            const searchParams = new URLSearchParams({ page: `${currentPageNumber + 1}` });
            nextURL = `/?${searchParams}`;
        }
        return {
            props: {
                recipes: result.recipes,
                prevURL,
                nextURL
            }
        }
    }
}

export default Home;