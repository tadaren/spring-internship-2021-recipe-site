import { FC } from 'react';
import Image from 'next/image';
import { Recipe } from '../lib/recipe';

type Props = {
    recipe: Recipe;
};

export const RecipeBox: FC<Props> = (props) => {
    return (
        <div className="px-3 py-1 m-1 shadow">
            <h2 className="font-bold">{props.recipe.title}</h2>
            <div className="flex items-center justify-between">
                <div className="w-5/12">
                    <Image
                        src={
                            props.recipe.image_url
                                ? props.recipe.image_url
                                : '/noimage.png'
                        }
                        alt="レシピ画像"
                        width={640}
                        height={360}
                        layout="responsive"
                    />
                </div>

                <div className="w-6/12 h-full">
                    <div className="text-sm text-gray-700">
                        {props.recipe.description}
                    </div>
                </div>
            </div>
        </div>
    );
};
