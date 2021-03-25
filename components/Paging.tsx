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
                    <div className="w-32 h-12 text-center align-middle">
                        <FaArrowCircleLeft className="inline" />
                        前のページ
                    </div>
                </Link>
            ) : (
                <div></div>
            )}
            {nextURL ? (
                <Link href={nextURL}>
                    <div className="w-32 h-12 text-center align-middle">
                        次のページ
                        <FaArrowCircleRight className="inline" />
                    </div>
                </Link>
            ) : (
                <div></div>
            )}
        </div>
    );
};
