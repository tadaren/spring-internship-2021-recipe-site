import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaStar } from 'react-icons/fa';
import { SearchBox } from './SearchBox';

export const Header: FC = () => {
    const router = useRouter();
    const keyword =
        typeof router.query.search === 'string' ? router.query.search : '';

    return (
        <header>
            <div className="bg-gray-300 flex justify-between items-center">
                <Link href="/">
                    <a className="p-2">
                        <h1 className="text-4xl font-semibold text-gray-900">
                            レシピサイト
                        </h1>
                    </a>
                </Link>
                <Link href="/bookmarks">
                    <a className="text-center border p-1 rounded-lg bg-gray-100 my-2 mr-2 hover:bg-gray-200 flex items-center">
                        <FaStar color="#FCD34D" />
                        一覧
                    </a>
                </Link>
            </div>
            <SearchBox keyword={keyword} />
        </header>
    );
};
