import Link from 'next/link';
import { FC } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

type Props = {
    prevURL: string | null;
    nextURL: string | null;
};

export const Paging: FC<Props> = (props) => {
    const { prevURL, nextURL } = props;
    return (
        <div className="flex justify-between">
            {prevURL ? (
                <Link href={prevURL}>
                    <a className="w-28 h-12 flex items-center justify-end">
                        <FaArrowCircleLeft className="inline mr-1" />
                        前のページ
                    </a>
                </Link>
            ) : (
                <div></div>
            )}
            {nextURL ? (
                <Link href={nextURL}>
                    <a className="w-28 h-12 flex items-center">
                        次のページ
                        <FaArrowCircleRight className="inline ml-1" />
                    </a>
                </Link>
            ) : (
                <div></div>
            )}
        </div>
    );
};
