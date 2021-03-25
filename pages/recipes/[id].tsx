import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import { getRecipe, Recipe } from '../../lib/recipe';

type Props = {
    recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
    const { recipe } = props;
    const publishedDate = new Date(recipe.published_at);
    const formattedDate = `${publishedDate.getFullYear()}/${
        publishedDate.getMonth() + 1
    }/${publishedDate.getDate()}`;

    return (
        <Layout
            title={recipe ? recipe.title : undefined}
            description={recipe ? recipe.description : undefined}
            image={recipe ? recipe.image_url : undefined}
        >
            {recipe && (
                <main className="mx-4">
                    {recipe.image_url && (
                        <div className="m-2">
                            <Image
                                src={recipe.image_url}
                                alt="レシピ画像"
                                width={640}
                                height={360}
                                layout="responsive"
                            />
                        </div>
                    )}

                    <h2 className="font-bold text-xl">{recipe.title}</h2>

                    <div className="flex justify-between">
                        <div className="text-gray-700">
                            {recipe.author.user_name}
                        </div>
                        <div className="text-gray-600">{formattedDate}</div>
                    </div>

                    <p className="mt-3">{recipe.description}</p>

                    <div className="bg-gray-100 mt-3">
                        <h3 className="bg-gray-200 text-lg pl-2 font-semibold">
                            材料
                        </h3>
                        <ul>
                            {recipe.ingredients.map(
                                (ing, i) =>
                                    ing.name &&
                                    ing.quantity && (
                                        <li key={i} className="mt-1 ml-1">
                                            {ing.name}: {ing.quantity}
                                        </li>
                                    ),
                            )}
                        </ul>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.params?.id);

    if (id === 0 || isNaN(id)) {
        return {
            notFound: true,
        };
    } else {
        const recipe = await getRecipe(id);
        return {
            props: {
                recipe,
            },
        };
    }
};

export default RecipePage;
