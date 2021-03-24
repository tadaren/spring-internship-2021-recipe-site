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
            <div className="search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="検索ワード"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
        </form>
    );
};
