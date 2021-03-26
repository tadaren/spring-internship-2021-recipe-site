import { ReactNode, FC } from 'react';
import Head from 'next/head';
import { Header } from './Header';

type Props = {
    children?: ReactNode;
    title?: string;
    description?: string;
    image?: string | null;
};

export const Layout: FC<Props> = ({
    children,
    title = 'レシピサイト',
    description = 'レシピを検索して表示できるサイト',
    image = 'https://fujimoto-spring-internship-2021-recipe-site.vercel.app/top.png',
}: Props) => {
    return (
        <div>
            <Head>
                <title>レシピサイト</title>
                <meta
                    content="レシピを検索して表示し，ブックマークもできるよ"
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image ? image : undefined} />
            </Head>
            <Header />
            {children}
        </div>
    );
};
