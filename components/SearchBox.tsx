import { useRouter } from "next/router";
import { FC, useState } from "react";

type Props = {
    keyword: string;
}

export const SearchBox: FC<Props> = (props) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string>(props.keyword);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (keyword === '') {
                router.push('/');
            } else {
                const params = {
                    search: keyword
                }
                const searchParams = new URLSearchParams(params);
                router.push(`/?${searchParams}`);
            }
        }}>
            <input type="text" name="" id="" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </form>
    );
};
