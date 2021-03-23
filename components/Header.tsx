import Link from 'next/link';

export function Header() {
    return (
        <header>
            <Link href='/'>
                <h1>レシピサイト</h1>
            </Link>
        </header>
    );
};
