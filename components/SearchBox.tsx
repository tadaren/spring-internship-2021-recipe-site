import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

type Props = {
    keyword: string;
};

export const SearchBox: FC<Props> = (props) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string>(props.keyword);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (keyword === '') {
                    router.push('/');
                } else {
                    const params = {
                        search: keyword,
                    };
                    const searchParams = new URLSearchParams(params);
                    router.push(`/?${searchParams}`);
                }
            }}
        >
            <div className="p-1">
                <div className="flex items-center h-10 px-2 border rounded-lg">
                    <FaSearch className="mr-2" />
                    <input
                        className="w-full"
                        type="text"
                        placeholder="検索ワード"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
};
