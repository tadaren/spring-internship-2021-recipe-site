import { ReactNode } from "react"
import { Header } from "./Header"
import Head from "next/head"

type Props = {
    children?: ReactNode;
    title?: string;
    description?: string;
    image?: string | null;
}

export default function Layout({
    children,
    title = "レシピサイト",
    description,
    image
}: Props) {
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
}