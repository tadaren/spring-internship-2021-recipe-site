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
                <div className="bg-gray-300 p-2">
                    <h1 className="text-4xl font-semibold text-gray-900">
                        レシピサイト
                    </h1>
                </div>
            </Link>
            <SearchBox keyword={keyword} />
        </header>
    );
};
