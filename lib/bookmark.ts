import Dexie from 'dexie';

class BookmarkDatabase extends Dexie {
    bookmarks: Dexie.Table<IBookmark, number>;

    constructor() {
        super('BookmarkDatabase');
        this.version(1).stores({
            bookmarks: 'id',
        });
        this.bookmarks = this.table('bookmarks');
        console.log('constructor');
    }
}

interface IBookmark {
    id: number;
}

const db = new Dexie('BookmarkDatabase') as BookmarkDatabase;
db.version(1).stores({ bookmarks: 'id' });

export const putBookmark = async (id: number) => {
    db.bookmarks.put({ id });
};

export const getIsBookmarked = async (id: number) => {
    return db.bookmarks.get({ id });
};

export const deleteBookmark = async (id: number) => {
    db.bookmarks.delete(id);
};
