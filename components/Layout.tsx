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
    image,
}: Props) => {
    return (
        <div>
            <Head>
                <title>レシピサイト</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image ? image : undefined} />
            </Head>
            <Header />
            {children}
        </div>
    );
};
