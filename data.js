// Constructor

function book(title, author, haveRead, pages, bookStatus, rating, bookCategory, imgSrc) {
    this.title = title
    this.author = author

    this.haveRead = haveRead
    this.totalPages = pages
    this.bookStatus = bookStatus

    this.rating = rating
    this.bookCategory = [...bookCategory]

    this.logs = {}

    if (imgSrc)
        this.imageSrc = imgSrc

    this.setTotalPageOnLog = function (logs) {
        for (let log of Object.values(logs)) {
            log['body-totalPage'] = this.totalPages
            log['body-onProgress'] = function () {
                return Math.floor(Number(this['body-onPage']) / Number(this['body-totalPage']) * 100)
            }
        }
    }

    this.dateCreated = new Date()
    this.dateUpdated = new Date()
}

book.prototype.imageSrc = './assets/web/svg-images/book/book3.svg'

let library = {
    'book-14190': new book(
        'The Hobbit',
        'J.R.R. Tolkein',
        '295',
        '1025',
        'In-Progress',
        '3.0',
        ['thriller', 'horror', 'fantasy', 'unknown'],
        'https://i0.wp.com/stonesoup.com/wp-content/uploads/2018/05/2018-6-The-Hobbit.jpg?fit=306%2C500&ssl=1'),
    'book-15690': new book(
        'Wrong Place Wrong Time',
        'Gillian McAllister',
        '1244',
        '1244',
        'Completed',
        '3.0',
        ['horror', 'self-help'],
        'https://i.guim.co.uk/img/media/a39b7a5a36961a7f4ba5ec245c4a20c43f087c84/0_0_226_346/master/226.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=87a8f9e92fb6146f7e32a0ebd9f386da'),
    'book-16690': new book(
        'Lorem Ipsum So Some',
        'You MyAl',
        '0',
        '244',
        'Not Started',
        '0.0',
        ['thriller', 'unknown']),
    'book-17290': new book(
        'Lorem Ipsum So Some None Some So You',
        'You MyAl',
        '123',
        '244',
        'In-Progress',
        '2.0',
        ['fiction', 'sample'],
        'https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg')
};

library['book-14190'].logs = {
    'default-1418': {
        'body-iconState': {
            'src': './assets/web/svg-icons/bookmark.svg',
            'alt': 'Bookmark'
        },
        'body-timeStamp': '2022-09-16 18:55',
        'body-onPage': '321',
        'body-entryLog': `Lorem ipsum dolor dsafsdfsdfsdfasdfasdfsit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Molestias, quidem eos, minima dolorem esse quisquam dolor provident eaque quibusdam dignissimos quia architecto deleniti animi non possimus suscipit debitis. Repellendus, saepe?`
    },
    'default-1419': {
        'body-iconState': {
            'src': './assets/web/svg-icons/comment.svg',
            'alt': 'Comment'
        },
        'body-timeStamp': '2022-01-16 16:55',
        'body-onPage': '521',
        'body-entryLog': `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Itaque, esse.`
    },
    'default-1420': {
        'body-iconState': {
            'src': './assets/web/svg-icons/summary.svg',
            'alt': 'Summary'
        },
        'body-timeStamp': '2022-05-16 21:55',
        'body-onPage': '324',
        'body-entryLog': `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, dipisicing elit. Dolor voluptatibus est velit.`
    }
};

library['book-15690'].logs = {
    'default-1418': {
        'body-iconState': {
            'src': './assets/web/svg-icons/bookmark.svg',
            'alt': 'Bookmark'
        },
        'body-timeStamp': '2022-09-16 18:55',
        'body-onPage': '321',
        'body-entryLog': `Lorem ipsum dolor dsafsdfsdfsdfasdfasdfsit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Molestias, quidem eos, minima dolorem esse quisquam dolor provident eaque quibusdam dignissimos quia architecto deleniti animi non possimus suscipit debitis. Repellendus, saepe?`
    },
    'default-1419': {
        'body-iconState': {
            'src': './assets/web/svg-icons/comment.svg',
            'alt': 'Comment'
        },
        'body-timeStamp': '2022-01-16 16:55',
        'body-onPage': '521',
        'body-entryLog': `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Itaque, esse.`
    },
    'default-1420': {
        'body-iconState': {
            'src': './assets/web/svg-icons/summary.svg',
            'alt': 'Summary'
        },
        'body-timeStamp': '2022-05-16 21:55',
        'body-onPage': '',
        'body-entryLog': `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, dipisicing elit. Dolor voluptatibus est velit.`
    }
};

library['book-16690'].log = {
    'default-1418': {
        'body-iconState': {
            'src': './assets/web/svg-icons/bookmark.svg',
            'alt': 'Bookmark'
        },
        'body-timeStamp': '2022-09-16 18:55',
        'body-onPage': '321',
        'body-entryLog': `Lorem ipsum dolor dsafsdfsdfsdfasdfasdfsit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Molestias, quidem eos, minima dolorem esse quisquam dolor provident eaque quibusdam dignissimos quia architecto deleniti animi non possimus suscipit debitis. Repellendus, saepe?`
    },
    'default-1419': {
        'body-iconState': {
            'src': './assets/web/svg-icons/comment.svg',
            'alt': 'Comment'
        },
        'body-timeStamp': '2022-01-16 16:55',
        'body-onPage': '521',
        'body-entryLog': `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Itaque, esse.`
    },
    'default-1420': {
        'body-iconState': {
            'src': './assets/web/svg-icons/summary.svg',
            'alt': 'Summary'
        },
        'body-timeStamp': '2022-05-16 21:55',
        'body-onPage': '324',
        'body-entryLog': `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, dipisicing elit. Dolor voluptatibus est velit.`
    }
};


library['book-17290'].log = {
    'default-1418': {
        'body-iconState': {
            'src': './assets/web/svg-icons/summary.svg',
            'alt': 'Summary'
        },
        'body-timeStamp': '2022-09-16 18:55',
        'body-onPage': '',
        'body-entryLog': `Lorem ipsum dolor dsafsdfsdfsdfasdfasdfsit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Molestias, quidem eos, minima dolorem esse quisquam dolor provident eaque quibusdam dignissimos quia architecto deleniti animi non possimus suscipit debitis. Repellendus, saepe?`
    },
    'default-1419': {
        'body-iconState': {
            'src': './assets/web/svg-icons/comment.svg',
            'alt': 'Comment'
        },
        'body-timeStamp': '2022-01-16 16:55',
        'body-onPage': '521',
        'body-entryLog': `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Itaque, esse.`
    },
    'default-1420': {
        'body-iconState': {
            'src': './assets/web/svg-icons/summary.svg',
            'alt': 'Summary'
        },
        'body-timeStamp': '2022-05-16 21:55',
        'body-onPage': '324',
        'body-entryLog': `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, dipisicing elit. Dolor voluptatibus est velit.`
    }
};

function setTotalPage() {
    for (let book in library) {
        library[book].setTotalPageOnLog(library[book].logs)
        // console.log(library[book].logs)
    }
}

setTotalPage()