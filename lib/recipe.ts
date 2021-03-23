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
}

export type GetResponse = {
    recipes: Recipe[];

    links: {
        next?: string;
        prev?: string;
    };
}

export async function getRecipes(): Promise<GetResponse> {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if(api_key === undefined){
        throw new Error();
    }
    const res = await fetch('https://internship-recipe-api.ckpd.co/recipes', {
        headers: { 'X-Api-Key': api_key }
    });
    const recipes = await res.json();
    console.log(recipes.recipes);
    return recipes as GetResponse;
}

export async function getRecipe(id: number): Promise<Recipe> {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if(api_key === undefined){
        throw new Error();
    }
    const res = await fetch(`https://internship-recipe-api.ckpd.co/recipes/${id}`,{
        headers: { 'X-Api-Key': api_key }
    });
    const recipe = await res.json();
    console.log(recipe);
    return recipe as Recipe;
}

export async function searchRecipe(keyword: string): Promise<GetResponse>{
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    if (api_key === undefined) {
        throw new Error();
    }
    const params = {
        keyword
    }
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`https://internship-recipe-api.ckpd.co/search?${searchParams}`, {
        headers: { 'X-Api-Key': api_key }
    });
    const searchResponse = await res.json();
    return searchResponse as GetResponse;
}
