// ANCHOR Sort Book Overview
const sortType = document.querySelector('.filter>select#selectOrder')
const sort = document.querySelectorAll('.filter-sort>.input.input-radio')

// console.log(filterSort)

function sortBookOverview() {

    const sortOrder = sortType.value
    console.log(document.querySelector('.filter-sort>.input.input-radio:checked').value)
}

sortType.addEventListener('change', sortBookOverview)
sort.forEach(order => order.addEventListener('change', sortBookOverview))

// SECTION Filtering
function filterBook() {

    // ANCHOR Label Filter
    const checkedLabels = Array.from(document.querySelectorAll('.filter-labelWrapper>.input.input-checkBox:checked')).map(function (bookLabel) {
        // console.log(bookLabel.classList[3])
        return bookLabel.classList[3]
    })

    // console.log(checkedLabels)

    // ANCHOR Book Status Filter
    const checkedStatus = Array.from(document.querySelectorAll('.filter>input.input-radioStatus:checked')).map(
        function (checkState) {
            return checkState.value
        }
    )

    // console.log(checkedStatus)

    // ANCHOR All Book Overview
    const allBookOv = Array.from(document.querySelectorAll('main.book-overview'))
        .map(
            function (bookOV) {
                return bookOV.id
            })

    let filteredBookIDs = []

    // ANCHOR 1st: Filtered with Labels
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

    // console.log('Book Status Filter', filteredBookIDs)

    // ANCHOR Show / Hide
    // Labels To Hide
    let restBookIDs = allBookOv
        .filter(function (bookId) {
            return !filteredBookIDs.includes(bookId)
        })

    // Show All if None Selected
    if (!checkedLabels.length &&
        !checkedStatus.length) {

        return allBookOv.forEach(bookID => {
            document.querySelector(`#${bookID}`).classList.remove('displayNone')

        })
    }

    // To Show Filtered
    filteredBookIDs.forEach(bookID => {
        document.querySelector(`#${bookID}`).classList.remove('displayNone')
    })

    // To Hide Rest
    restBookIDs.forEach(bookID => {
        document.querySelector(`#${bookID}`).classList.add('displayNone')
    })
}

// END !SECTION Filtering



//  ANCHOR Set Filter Book Status
const bookStatus = Array.from(document.querySelectorAll('.filter>input.input-radioStatus'))

bookStatus.forEach(status => status.addEventListener('change', filterBook))