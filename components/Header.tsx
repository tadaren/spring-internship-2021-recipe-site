import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchBox } from './SearchBox';

export const Header: FC = () => {
    const router = useRouter();
    const keyword =
        typeof router.query.search === 'string' ? router.query.search : '';

    return (
        <header>
            <Link href="/">
                <h1>レシピサイト</h1>
            </Link>
            <SearchBox keyword={keyword} />
        </header>
    );
};
