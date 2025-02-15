import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Layout } from '../../components/Layout';
import {
    deleteBookmark,
    getIsBookmarked,
    putBookmark,
} from '../../lib/bookmark';
import { getRecipe, getRecipes, Recipe } from '../../lib/recipe';

type Props = {
    recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
    const { recipe } = props;
    const [isBookmarked, setBookmark] = useState<boolean>(false);

    const publishedDate = new Date(recipe.published_at);
    const formattedDate = `${publishedDate.getFullYear()}/${
        publishedDate.getMonth() + 1
    }/${publishedDate.getDate()}`;

    const image_url =
        recipe && recipe.image_url !== null
            ? recipe.image_url
            : 'https://fujimoto-spring-internship-2021-recipe-site.vercel.app/top.png';

    const toBookmark = () => {
        console.log('toBookmark');
        setBookmark(true);
        putBookmark(props.recipe.id);
    };
    const unBookmark = () => {
        console.log('unBookmark');
        setBookmark(false);
        deleteBookmark(props.recipe.id);
    };

    useEffect(() => {
        (async () => {
            const data = await getIsBookmarked(props.recipe.id);
            setBookmark(data !== undefined);
        })();
    }, []);

    return (
        <Layout
            title={recipe ? recipe.title : undefined}
            description={recipe ? recipe.description : undefined}
            image={image_url}
        >
            {recipe && (
                <main className="mx-4">
                    <div className="w-full h-48 relative">
                        <Image
                            src={
                                recipe.image_url !== null
                                    ? recipe.image_url
                                    : '/noimage.png'
                            }
                            alt="レシピ画像"
                            layout="fill"
                            objectFit={'cover'}
                        />
                    </div>

                    <h2 className="font-bold text-xl mt-2">{recipe.title}</h2>
                    <div className="flex justify-between">
                        <div className="text-gray-700">
                            {recipe.author.user_name}
                        </div>
                        {isBookmarked ? (
                            <button
                                className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={unBookmark}
                                aria-label="ブックマーク解除"
                            >
                                <FaStar color="#FCD34D" />
                            </button>
                        ) : (
                            <button
                                className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={toBookmark}
                                aria-label="ブックマーク登録"
                            >
                                <FaRegStar color="#FCD34D" />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <div className="text-gray-600">{formattedDate}</div>
                    </div>

                    <p className="mt-3">{recipe.description}</p>

                    <div className="bg-gray-100 mt-3">
                        <h3 className="bg-gray-200 text-lg pl-2 font-semibold">
                            材料
                        </h3>
                        <div className="px-2">
                            <table className="w-full">
                                {recipe.ingredients.map(
                                    (ing, i) =>
                                        ing.name &&
                                        ing.quantity && (
                                            <tr key={i} className="mt-1 ml-1">
                                                <td>{ing.name}</td>
                                                <td className="text-right">
                                                    {ing.quantity}
                                                </td>
                                            </tr>
                                        ),
                                )}
                            </table>
                        </div>
                    </div>

                    <div className="bg-gray-100 mt-3">
                        <h3 className="bg-gray-200 text-lg pl-2 font-semibold">
                            手順
                        </h3>
                        <ol className="list-decimal ml-6">
                            {recipe.steps.map((step, i) => (
                                <li key={i} className="mt-1">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </main>
            )}
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = Number(context.params?.id);

    if (id === 0 || isNaN(id)) {
        return {
            notFound: true,
            revalidate: 60,
        };
    } else {
        const recipe = await getRecipe(id);
        return {
            props: {
                recipe,
            },
            revalidate: 600,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
    const res = await getRecipes();
    const recipes = res.recipes;
    return {
        paths: recipes.map((recipe) => {
            return { params: { id: recipe.id.toString() } };
        }),
        fallback: 'blocking',
    };
};

export default RecipePage;
