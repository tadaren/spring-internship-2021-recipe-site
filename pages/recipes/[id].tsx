import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../../components/Layout';
import { getRecipe, Recipe } from '../../lib/recipe';

type Props = {
    recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
    const { recipe } = props;

    return (
        <Layout
            title={recipe ? recipe.title : undefined}
            description={recipe ? recipe.description : undefined}
            image={recipe ? recipe.image_url : undefined}
        >
            {recipe && (
                <main>
                    {recipe.image_url && (
                        <img
                            src={recipe.image_url}
                            alt="レシピ画像"
                            width="100%"
                        />
                    )}

                    <h2>{recipe.title}</h2>

                    <div>{recipe.author.user_name}</div>
                    <div>{recipe.published_at}</div>

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
