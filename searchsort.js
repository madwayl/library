// SECTION Sort Book Overview
const sortDropDown = document.querySelector('.filter>select#selectOrder')
const sortRadio = document.querySelectorAll('.filter-sort>.input.input-radio')

// console.log(filterSort)

function sortBookOverview() {

    const allBookOv = Object.keys(library)

    const sortType = sortDropDown.value
    const sortOrder = document.querySelector('.filter-sort>.input.input-radio:checked').value

    console.log('Before: ', allBookOv)

    if (sortType == 'dateCreated' || sortType == 'dateUpdated') {
        allBookOv.sort(function (first, next) {
            return new Date(library[first][`${sortType}`]) - new Date(library[next][`${sortType}`])
        })
    } else if (sortType == 'progress') {
        allBookOv.sort(function (first, next) {
            console.log(library[first].progress(), library[next].progress())
            return library[first].progress() - library[next].progress()
        })
    } else {
        allBookOv.sort(function (first, next) {
            return library[first][`${sortType}`] - library[next][`${sortType}`]
        })
    }

    if (sortOrder == 'Desc') {
        allBookOv.reverse()
    }

    console.log('After: ', allBookOv)

    allBookOv.forEach(bookId => {
        bodySec.appendChild(document.querySelector(`#${bookId}`))
    })

}

sortDropDown.addEventListener('change', sortBookOverview)
sortRadio.forEach(order => order.addEventListener('change', sortBookOverview))

// END !SECTION Sort Book Overview


// SECTION Filtering

//  ANCHOR Set Filter Book Status
const bookStatus = Array.from(document.querySelectorAll('.filter>input.input-radioStatus'))

bookStatus.forEach(status => status.addEventListener('change', filterBook))

// ANCHOR Set Filter Search
const searchCancel = document.querySelector('span.search-cancel')

const searchInput = document.querySelector('input.search.search-bar')

searchInput.addEventListener('input', filterBook)

function filterBook() {

    const allBookOv = Object.keys(library)

    let filteredBookIDs = []

    // ANCHOR 1st: Filtered with Labels
    const checkedLabels = Array.from(document.querySelectorAll('.filter-labelWrapper>.input.input-checkBox:checked')).map(function (bookLabel) {
        // console.log(bookLabel.classList[3])
        return bookLabel.classList[3]
    })

    // console.log(checkedLabels)

    if (checkedLabels.length) {
        filteredBookIDs = allBookOv
            .filter(function (bookId) {
                let status = false
                for (let label of checkedLabels) {
                    status = library[bookId].bookCategory.includes(label)
                    if (status) break
                }
                return status
            })
    }

    // console.log('Label Filter', filteredBookIDs)

    // ANCHOR 2nd: Filtered with Book Status

    const checkedStatus = Array.from(document.querySelectorAll('.filter>input.input-radioStatus:checked')).map(
        function (checkState) {
            return checkState.value
        }
    )

    // console.log(checkedStatus)

    if (checkedStatus.length) {
        if (checkedLabels.length) {
            filteredBookIDs = filteredBookIDs
                .filter(
                    function (bookId) {
                        return checkedStatus.includes(library[bookId].bookStatus)
                    }
                )
        } else {
            filteredBookIDs = allBookOv
                .filter(
                    function (bookId) {
                        return checkedStatus.includes(library[bookId].bookStatus)
                    }
                )
        }
    }

    // ANCHOR 3rd: Filtered with Search

    const searchValue = searchInput.value.toLowerCase()

    if (searchValue.length) {
        if (checkedLabels.length || checkedStatus.length) {
            filteredBookIDs = filteredBookIDs
                .filter(function (bookId) {
                    let state = false
                    for (let value of
                        [library[bookId].author.toLowerCase(),
                        library[bookId].title.toLowerCase()]) {
                        state = value.includes(searchValue)
                        if (state) break
                    }
                    return state
                })
        } else {
            filteredBookIDs = allBookOv
                .filter(function (bookId) {
                    let state = false
                    for (let value of
                        [library[bookId].author.toLowerCase(),
                        library[bookId].title.toLowerCase()]) {
                        state = value.includes(searchValue)
                        if (state) break
                    }
                    return state
                })
        }

        searchCancel.addEventListener('click', e => {
            searchInput.value = ''
            filterBook()
        }, { once: true })

    }

    // console.log('Book Status Filter', filteredBookIDs)

    // ANCHOR Show / Hide

    // Labels To Hide
    let restBookIDs = allBookOv
        .filter(function (bookId) {
            return !filteredBookIDs.includes(bookId)
        })

    // To Show Filtered
    filteredBookIDs.forEach(bookID => {
        document.querySelector(`[id='${bookID}']`).classList.remove('displayNone')
    })

    // debugger
    // To Show Nothing Div if none exists
    if (!filteredBookIDs.length) {
        document.querySelector('section.body>main.nothing').classList.remove('displayNone')
    } else {
        document.querySelector('section.body>main.nothing').classList.add('displayNone')
    }

    // To Hide Rest
    restBookIDs.forEach(bookID => {
        document.querySelector(`[id='${bookID}']`).classList.add('displayNone')
    })

    // Show All if None Selected
    if (!checkedLabels.length &&
        !checkedStatus.length &&
        !searchValue.length) {

        document.querySelector('section.body>main.nothing').classList.add('displayNone')

        return allBookOv.forEach(bookID => {
            document.querySelector(`[id='${bookID}']`).classList.remove('displayNone')
        })
    }
}

// END !SECTION Filtering
