export type Recipe = {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    author: {
        user_name: string;
    };
    published_at: string;
    steps: string[];
    ingredients: {
        name: string;
        quantity: string;
    }[];
    related_recipes: number[];
};

export type GetResponse = {
    recipes: Recipe[];

    links: {
        next?: string;
        prev?: string;
    };
};

export async function getRecipes(page?: number): Promise<GetResponse> {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if (api_key === undefined) {
        throw new Error();
    }
    const params = {
        page: `${page !== undefined ? page : 1}`,
    };
    const searchParams = new URLSearchParams(params);
    const res = await fetch(
        `https://internship-recipe-api.ckpd.co/recipes?${searchParams}`,
        {
            headers: { 'X-Api-Key': api_key },
        },
    );
    const recipes = await res.json();
    return recipes as GetResponse;
}

export async function getRecipe(id: number): Promise<Recipe> {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if (api_key === undefined) {
        throw new Error();
    }
    const res = await fetch(
        `https://internship-recipe-api.ckpd.co/recipes/${id}`,
        {
            headers: { 'X-Api-Key': api_key },
        },
    );
    const recipe = await res.json();
    return recipe as Recipe;
}

export async function searchRecipe(
    keyword: string,
    page?: number,
): Promise<GetResponse> {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if (api_key === undefined) {
        throw new Error();
    }
    console.log(page);
    const params = {
        keyword,
        page: `${page !== undefined ? page : 1}`,
    };
    const searchParams = new URLSearchParams(params);
    const res = await fetch(
        `https://internship-recipe-api.ckpd.co/search?${searchParams}`,
        {
            headers: { 'X-Api-Key': api_key },
        },
    );
    const searchResponse = await res.json();
    return searchResponse as GetResponse;
}
