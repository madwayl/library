// SECTION Search

const searchCancel = document.querySelector('span.search-cancel')

const searchInput = document.querySelector('input.search.search-bar')

searchInput.addEventListener('input', e => {
    if (e.target.value.length > 0) {
        searchCancel.addEventListener('click', e => {
            searchInput.value = ''
        })

    }
})


// END !SECTION Search

// SECTION Filter

const filterToggle = document.querySelector('input.input-checkBox.search-filter')

const filterSection = document.querySelector('section.filter')

filterToggle.addEventListener('input', e => {
    filterSection.classList.toggle('displayNone')
})

// END !SECTION Filter

// Common Attributes
const bookSection2 = document.querySelector('.book-section2')

// Radio Tabs
const radioTab = document.querySelectorAll('input.input.input-radioTab')

const popupOverlay = document.querySelector('section.popup-overlay');

const popupMenu = document.querySelector('main.popup');

const logTableBody = document.querySelector('tbody.table.table-body')

const saveBookPopup = document.querySelector('button.button.saveBook')

const cancelBookPopup = document.querySelector('button.button-fixed.bookCancel')

// SECTION Book Overview

// SECTION Create Book Overview

// ANCHOR Change Image
function changeBookImage(book) {
    const bookOvImage = document.createElement('img')
    bookOvImage.className = 'image image-book overview'
    bookOvImage.setAttribute('src', book['imageSrc'])
    bookOvImage.setAttribute('alt', `${book}-Image`)

    return bookOvImage
}

// ANCHOR Change Author
function changeAuthor(book) {
    const author = document.createElement('h5')
    author.className = 'heading heading-bookAuthor'
    author.textContent = book['author']

    return author
}

// ANCHOR Change book Title
function changeHeading(book) {
    const headingDiv = document.createElement('div')
    headingDiv.className = 'heading-element'
    const heading = document.createElement('h2')
    heading.className = 'heading heading-bookTitle'
    heading.textContent = book.title
    const headingTooltip = document.createElement('p')
    headingTooltip.className = 'tooltip heading-toolTip'
    headingTooltip.textContent = book.title

    headingDiv.appendChild(heading)
    headingDiv.appendChild(headingTooltip)

    return headingDiv
}

// ANCHOR Change Rating
function changeRating(book) {
    const rating = document.createElement('div')
    rating.classList.add('ratingBox')
    const ratingRate = document.createElement('span')
    ratingRate.classList.add('ratingBox-rate')
    ratingRate.textContent = book.rating
    const ratingTotal = document.createElement('span')
    ratingTotal.classList.add('ratingBox-total')
    ratingTotal.textContent = 'of 5'

    rating.appendChild(ratingRate)
    rating.appendChild(ratingTotal)

    return rating
}

// ANCHOR Change Progress
function changeProgress(book) {
    if (book.bookStatus == 'In-Progress') {
        // Show Number of Pages Left
        const progressDiv = document.createElement('div')
        progressDiv.className = 'progress progress-pages'

        const progressLeft = document.createElement('span')
        progressLeft.className = 'progress-pageLeft'

        const progressNoun = document.createElement('span')
        progressNoun.className = 'progress-pageNoun'
        if (book.haveRead == book.totalPages) {
            progressLeft.textContent = 'No'
            progressNoun.textContent = `page`
        } else {
            progressLeft.textContent = book.totalPages - book.haveRead
            progressNoun.textContent = `pages`
        }

        const progressAction = document.createElement('span')
        progressAction.className = 'progress-pageAction'
        progressAction.textContent = `left`

        progressDiv.appendChild(progressLeft)
        progressDiv.appendChild(progressNoun)
        progressDiv.appendChild(progressAction)

        return progressDiv

    } else {
        // Text Based Progress
        const progressDiv = document.createElement('div')
        progressDiv.className = 'progress progress-state'

        const progressNoun = document.createElement('span')
        progressNoun.className = 'progress-bookNoun'
        progressNoun.textContent = 'Book'

        progressDiv.appendChild(progressNoun)

        if (book.bookStatus == 'Completed') {

            // Show Completed
            const progressState = document.createElement('span')
            progressState.className = 'progress-bookState completed'
            progressState.textContent = 'Completed'

            progressDiv.appendChild(progressState)

        } else {

            // Show Not Started
            const progressState = document.createElement('span')
            progressState.className = 'progress-bookState notStarted'
            progressState.textContent = 'Not Started'

            progressDiv.appendChild(progressState)

        }

        return progressDiv

    }
}

// ANCHOR Change Tags
let bookTags = [[], []]
let bookTagsCSS = [];

const filterLabelWrapper = document.querySelector('.filter-labelWrapper')

function changeTags(book) {

    // Add Tags in Global
    function createCSS_Filters(tag) {
        if (bookTags[0].includes(tag)) return false

        // Colors for Tags
        function rgbGen() {

            let r, g, b;
            let times = 0;

            while (true) {

                r = Math.floor(Math.random() * (230 - 100) + 100)
                g = Math.floor(Math.random() * (230 - 100) + 100)
                b = Math.floor(Math.random() * (230 - 100) + 100)

                // console.log('before', bookTags[1])

                for (let colors of bookTags[1]) {

                    // console.log('done', bookTags[1])
                    // console.log(typeof colors, colors)

                    let total = colors.reduce((first, next) => first + next)

                    if (total - r + g + b < 100) break
                    times += 1
                }

                if (times == bookTags[0].length || times == 0) return [r, g, b]

            }
        }

        let rgbValues = rgbGen()

        bookTags[0].push(tag)
        bookTags[1].push([rgbValues])
        bookTagsCSS.push(`.label-${tag}{ background-color : rgb(${rgbValues.toString()})}`)

        // Label in Filter Section
        const label = document.createElement('input')
        label.setAttribute('type', 'checkbox')
        label.className = `input input-checkBox label-${tag} ${tag}`
        label.id = `${tag}Label`
        label.setAttribute('data-detailed', `# ${tag}`)
        // label.checked = true;
        filterLabelWrapper.appendChild(label)
    }

    // Label Container
    const bookLabel = document.createElement('div')
    bookLabel.className = 'bookLabels-div'
    const bookLabelWrapper = document.createElement('div')
    bookLabelWrapper.className = 'bookLabels-wrapper'

    // Check Tags on Book Overview
    for (let tag of book['bookCategory']) {
        tag = tag.toLowerCase()

        createCSS_Filters(tag)

        const spanLabel = document.createElement('span')
        spanLabel.className = `bookLabels label-${tag} ${tag}`
        spanLabel.textContent = tag.charAt(0).toUpperCase() + tag.slice(1)

        bookLabelWrapper.appendChild(spanLabel)
    }

    // Append Style Element in Head
    document.querySelector('style').remove()


    let style = document.createElement('style')
    style.setAttribute('type', 'text/css');
    style.textContent = bookTagsCSS.join(' ');
    document.querySelector('head').appendChild(style);

    bookLabel.appendChild(bookLabelWrapper);

    return bookLabel
}

function clearOldLabels() {
    let filterLabels = document.querySelector('div.filter-labelWrapper').children

    let labels = ['']
    const allBookLabels = document.querySelectorAll('.bookLabels')

    for (const bookLabel of allBookLabels) {
        if (!(labels.includes(bookLabel.classList[2]))) {
            labels.push(bookLabel.classList[2])
        }
    }

    for (const filterLabel of filterLabels) {

        if (!labels.includes(filterLabel.classList[3]) && labels.length > 0) {

            const labelIndex = bookTags[0].indexOf(filterLabel.classList[3])

            filterLabel.remove()

            delete bookTags[0][labelIndex]
            delete bookTags[1][labelIndex]
            delete bookTagsCSS[labelIndex]
        }

    }
}

// ANCHOR Add Editing Buttons
function addEditButtons(book) {
    const bookEditCheckBox = document.createElement('input')
    bookEditCheckBox.setAttribute('type', 'checkbox')
    bookEditCheckBox.setAttribute('name', 'edit-book')
    bookEditCheckBox.className = 'input input-bookEdit'

    // Buttons Container
    const bookEditDisp = document.createElement('div')
    bookEditDisp.className = 'books-bookEdits displayNone'

    // Buttons Edit
    const buttonEdit = document.createElement('button')
    buttonEdit.className = 'button button-bookEdit editBook'
    const buttonEditSpan = document.createElement('span')
    buttonEditSpan.className = 'icon-Button editBook'
    buttonEdit.appendChild(buttonEditSpan)
    buttonEdit.appendChild(document.createTextNode('Edit'))
    buttonEdit.addEventListener('click', e => {
        setOnEdit(e.currentTarget.parentElement.parentElement, e.currentTarget.parentElement.parentElement.id);

        radioTab[0].checked = true;
        radioTab[1].disabled = false;

    })

    bookEditDisp.appendChild(buttonEdit)

    // Buttons Log
    const buttonLog = document.createElement('button')
    buttonLog.className = 'button button-bookEdit logBook'
    const buttonLogSpan = document.createElement('span')
    buttonLogSpan.className = 'icon-Button logBook'
    buttonLog.appendChild(buttonLogSpan)
    buttonLog.appendChild(document.createTextNode('Log'))
    buttonLog.addEventListener('click', e => {
        setOnEdit(e.currentTarget.parentElement.parentElement, e.currentTarget.parentElement.parentElement.id)

        radioTab[1].checked = true;
        radioTab[1].disabled = false;

    })

    bookEditDisp.appendChild(buttonLog)

    // Buttons Delete
    const buttonDel = document.createElement('button')
    buttonDel.className = 'button button-bookEdit removeBook'
    const buttonDelSpan = document.createElement('span')
    buttonDelSpan.className = 'icon-Button removeBook'
    buttonDel.appendChild(buttonDelSpan)
    buttonDel.appendChild(document.createTextNode('Delete'))
    buttonDel.addEventListener('click', e => {
        delete library[e.currentTarget.parentElement.parentElement.id]
        e.currentTarget.parentElement.parentElement.remove()
    })

    bookEditDisp.appendChild(buttonDel)

    return [bookEditCheckBox, bookEditDisp]
}

function createBookOverview(bookName, bookValue) {
    const bookOverview = document.createElement('main')
    bookOverview.classList.add('book-overview')
    bookOverview.id = bookName

    bookOverview.appendChild(changeBookImage(bookValue))
    bookOverview.appendChild(changeAuthor(bookValue))
    bookOverview.appendChild(changeHeading(bookValue))
    bookOverview.appendChild(changeRating(bookValue))
    bookOverview.appendChild(changeProgress(bookValue))
    bookOverview.appendChild(changeTags(bookValue))

    bookEdit = addEditButtons(bookValue)
    bookOverview.append(bookEdit[0], bookEdit[1])

    bookEdit[0].addEventListener('input', e => {
        // debugger;
        e.currentTarget.nextElementSibling.classList.toggle('displayNone')

        const bookTarget = e.currentTarget

        document.body.addEventListener('click', (e) => {
            if (!e.target.closest('.books-bookEdits') &&
                e.target != popupOverlay &&
                e.target != bookTarget &&
                e.target != bookOverview) {

                document.querySelector('.books-bookEdits').classList.add('displayNone')

                bookTarget.checked = false
            }
        })

    })

    bookOverview.addEventListener('click', (e) => {
        if (!e.target.closest('.input-bookEdit') &&
            !e.target.closest('.books-bookEdits')) {
            debugger;
            e.currentTarget.lastElementChild.classList.toggle('displayNone')
            e.currentTarget.lastElementChild.previousElementSibling.checked = !e.currentTarget.lastElementChild.previousElementSibling.checked

        }
    })

    bodySec.appendChild(bookOverview)
}

// Setup Initial Values from LINK data.js:12
const bodySec = document.querySelector('section.body')

for (let [bookName, bookValue] of Object.entries(library)) {
    createBookOverview(bookName, bookValue);
}

// END !SECTION Create Book Overview

// SECTION Book Edits

// All Inputs
const inputAll = Array.from(document.querySelectorAll('.input-element:not(.radioCheck)'))

// Individual Inputs
const picShowOnEdit = document.querySelector('main.book-section1>img.image.image-book.edit')

const picInput = document.querySelector('.input-element.addImageUrl>input.input.input-type.imageUrl')

const titleInput = document.querySelector('.input-element.title>input.input.input-type')

const authorInput = document.querySelector('.input-element.author>input.input.input-type')

const pageRead = document.querySelector('.input-element.page.Read>input.input.input-type')

const pageTotal = document.querySelector('.input-element.page.Total>input.input.input-type')

const labelInput = document.querySelector('.input-element.label>input.input-type')

// For Book Edits
function setBookOverview(book) {

    if (library[book].hasOwnProperty('imageSrc')) {
        picShowOnEdit.setAttribute('src', library[book].imageSrc)
        picInput.value = library[book].imageSrc
    }

    titleInput.value = library[book].title
    authorInput.value = library[book].author
    pageRead.value = library[book].haveRead
    pageTotal.value = library[book].totalPages

    document.querySelector(`input.input.input-radioStatus[name="book-status"][value="${library[book].bookStatus}"]`).checked = true

    if (library[book].rating > 0)
        document.querySelector(`div.ratingControl>input[name="rating"][value="${library[book].rating}"]`).checked = true

    labelInput.value = library[book].bookCategory.toString()
}

// For Book Logs
function setBookLogOverview(book) {

    logTableBody.textContent = ''

    for ([logName, logValue] of Object.entries(library[book].logs)) {

        // console.log(logName, logValue)

        const defaultRow = document.createElement('tr')
        defaultRow.className = 'default'
        defaultRow.dataset.book = book
        defaultRow.id = logName

        // Icon State
        const dataIcon = document.createElement('td')
        dataIcon.className = 'body body-iconState'
        const dataIconWrapper = document.createElement('div')
        dataIconWrapper.className = 'iconWrapper'
        const icon = document.createElement('img')
        icon.className = 'icon'
        icon.setAttribute('src', logValue['body-iconState']['src'])
        icon.setAttribute('alt', logValue['body-iconState']['alt'])

        dataIconWrapper.appendChild(icon)
        dataIcon.appendChild(dataIconWrapper)

        // Body TimeStamp
        const dataTime = document.createElement('td')
        dataTime.className = 'body body-timeStamp'
        dataTime.textContent = logValue['body-timeStamp']

        // Body onPage
        const dataOnPage = document.createElement('td')
        dataOnPage.className = 'body body-onPage'
        dataOnPage.textContent = logValue['body-onPage']

        // Body EntryLog
        const dataEntryLog = document.createElement('td')
        dataEntryLog.className = 'body body-entryLog'
        const dataEntryLogDesc = document.createElement('div')
        dataEntryLogDesc.className = 'logDesc'
        dataEntryLogDesc.textContent = logValue['body-entryLog']

        dataEntryLog.appendChild(dataEntryLogDesc)

        // Body Arrow
        const dataArrow = document.createElement('td')
        dataArrow.className = 'body body-editArrow'
        const arrowInput = document.createElement('input')
        arrowInput.setAttribute('type', 'checkbox')
        arrowInput.className = 'input input-checkBox button button-Row'
        dataArrow.appendChild(arrowInput)

        // Append All
        defaultRow.append(dataIcon, dataTime, dataOnPage, dataEntryLog, dataArrow)

        logRowEvent(defaultRow);

        logTableBody.appendChild(defaultRow)
    }
}

// Event Handlers for Edit Button & Log Edit Button
function setOnEdit(parentBook, bookId) {
    popupOverlay.classList.remove('displayNone')

    setBookOverview(bookId);
    setBookLogOverview(bookId);
    sortPriorTimeASC();

    cancelBookPopup.classList.add('edit')
    cancelBookPopup.classList.remove('add')

    saveBookPopup.classList.add('edit')
    saveBookPopup.classList.remove('add')

    bookSection2.scrollTop = 0

    inputAll.forEach(input => input.querySelector('input').classList.add('valid'))

    // SECTION Save Edits on Book

    document.querySelector('button.button.saveBook.edit').addEventListener('click', e => {

        // console.log('called submit click', e.target)

        // Check on Pic Input
        let picInputed = picInput.value.trim()
        if (picInputed != library[bookId].imageSrc && picShowOnEdit.getAttribute('src') == picInputed) {
            library[bookId].imageSrc = picInputed
        }

        // Check on Title
        let titleInputed = titleInput.value.trim()
        if (titleInputed != library[bookId].title) {
            library[bookId].title = titleInputed
            parentBook.children[2].textContent = titleInputed
        }

        // Check on Author
        let authorInputed = authorInput.value.trim()
        if (authorInputed != library[bookId].author) {
            library[bookId].author = authorInputed
            parentBook.children[1].textContent = authorInputed
        }

        // Check on Rating
        const ratingDef = document.querySelector(`div.ratingControl>input[name="rating"]:checked`)
        if (ratingDef != null) {
            if (ratingDef.value != library[bookId].rating) {
                library[bookId].rating = ratingDef.value
                parentBook.children[3].firstElementChild.textContent = ratingDef.value
            }
        } else {
            library[bookId].rating = '0.0'
        }


        // Check on Page Read
        let pageReadInputed = pageRead.value
        let pageReadChange = pageReadInputed != library[bookId].haveRead
        if (pageReadChange) {
            library[bookId].haveRead = pageReadInputed
        }

        // Check on Page Total
        let pageTotalInputed = pageTotal.value
        let pageTotalChange = pageTotalInputed != library[bookId].totalPages
        if (pageTotalChange) {
            library[bookId].totalPages = pageTotalInputed
        }

        // Check on Book Status
        // debugger;
        const bookStatusDefValue = document.querySelector(`input.input.input-radioStatus[name="book-status"]:checked`).value;
        if (bookStatusDefValue != library[bookId].bookStatus || pageReadChange || pageTotalChange) {
            library[bookId].bookStatus = bookStatusDefValue;
            parentBook.replaceChild(changeProgress(library[bookId]), parentBook.children[4])
        }

        // Check on Labels
        let labelInputed = labelInput.value.replace(' ', '').split(',');

        labelInputed = labelInputed.filter(Boolean)

        if (labelInputed.toString() != library[bookId].bookCategory.toString()) {
            library[bookId].bookCategory = labelInputed;
            parentBook.replaceChild(changeTags(library[bookId]), parentBook.children[5]);
            clearOldLabels();
        }

        popupOverlay.classList.add('displayNone');
        clearAll();

    }, { once: true })
    // END !SECTION Save Edits on Book

    // Close on Click Outside Menu
    popupOverlay.addEventListener('click', (e) => {
        if (!e.target.closest('main.popup'))
            popupOverlay.classList.add('displayNone')
    })
}


// END !SECTION Book Edits

// END !SECTION Book Overview

// SECTION Overlay Popup

// SECTION Book - Section 1

// Button for Image 
const buttonAddImage = document.querySelector('.button.button-image.addImage');
const buttonRemoveImage = document.querySelector('.button.button-image.removeImage');

// Event on Input URL Image
picInput.addEventListener('focusout', e => {
    if (e.target.validity.patternMismatch) {
        e.target.nextElementSibling.textContent = 'Not a Valid Image Link'
        e.target.classList.add('invalid');
        e.target.classList.remove('valid');
    } else {
        if (e.target.value.length > 0) {
            e.target.classList.add('valid');
            e.target.nextElementSibling.textContent = '';
        }
        e.target.classList.remove('invalid');
    }
});

// Add / Remove Image Button
[buttonAddImage, buttonRemoveImage].forEach(button => {
    button.addEventListener('click', e => {
        if (e.currentTarget == buttonAddImage) {
            picShowOnEdit.setAttribute('src', picInput.value)
        } else {
            picShowOnEdit.setAttribute('src', './assets/web/svg-images/book/book3.svg')
            picInput.textContent = ''
        }
    })
})

// END !SECTION Book - Section 1

// SECTION Book - Section 2

// SECTION Section 2 - Book Detail

// Regular Inputs
const inputs = Array.from(document.querySelectorAll('.tabWindow-bookDetails>.input-element:not(.radioCheck)'))

// Page Number Inputs
const inputPage = Array.from(document.querySelectorAll('.tabWindow-bookDetails>.input-element.page>input'))

// Radio Check Inputs
const inputPageCheck = Array.from(document.querySelectorAll('.input-element.radioCheck>input'))

inputs.forEach(input => {

    // ANCHOR Validation Input Elements
    input.querySelector('input').addEventListener('focusout', e => {

        // Set Max Value for Page Read so Far
        inputPage[0].max = inputPage[1].value;

        // Check Validity for Each Input Element
        if (!e.target.validity.valid) {
            e.target.nextElementSibling.textContent = 'This value is required!';
            e.target.classList.add('invalid');
            e.target.classList.remove('valid');

        } else {

            if (e.target.value.length > 0) {
                e.target.classList.add('valid');
                e.target.nextElementSibling.textContent = '';
            }
            e.target.classList.remove('invalid');
        }

        // Specific Validation for bookPages
        if (e.target.id == 'bookPagesRead' || e.target.id == 'bookPages') {

            // Check on Value Entry Only
            if (inputPage[0].value.length > 0 && inputPage[1].value.length > 0) {
                if (inputPage[0].validity.valid) {
                    inputPage[0].classList.add('valid')
                    inputPage[0].nextElementSibling.textContent = ''
                    inputPage[0].classList.remove('invalid')
                } else {
                    inputPage[0].classList.add('invalid')
                    inputPage[0].classList.remove('valid')
                    inputPage[0].nextElementSibling.textContent = 'Value can\'t be more than Total Page'
                }

                // Radio Button Check on Page Number Entry
                if (inputPage[0].value == inputPage[1].value) {
                    inputPageCheck[2].checked = true
                } else if (inputPage[0].value == null || inputPage[0].value == 0) {
                    inputPageCheck[0].checked = true
                } else {
                    inputPageCheck[1].checked = true
                }
            }

        }
    })

})

inputPageCheck[0].addEventListener('input', e => {
    inputPage[0].value = 0
})

inputPageCheck[2].addEventListener('input', e => {
    inputPage[0].value = inputPage[1].value
})

// END !SECTION Book Detail

// SECTION Section 2 - Book Logs

// SECTION Sorting Log Table

// Table Body
const tableBody = document.querySelector('tbody.table.table-body')

function sortPriorTimeASC() {
    let tableRowSorting = Array.from(tableBody.children);

    // Prior Sort by Ascending on TimeStamp
    tableRowSorting.sort((first, next) => {
        return new Date(first.children[1].textContent) - new Date(next.children[1].textContent)
    })

    tableRowSorting.forEach(sortRow => tableBody.appendChild(sortRow))
}

// Sorting Headers
const headerSort = Array.from(document.querySelectorAll('.input.input-checkBox.header'))

headerSort.forEach((sortHead) => {
    sortHead.addEventListener('click', e => {

        const tableSortRows = Array.from(tableBody.querySelectorAll(':scope>tr.default'))

        tableSortRows.forEach(row => {
            setToDefault(row)
        })

        if (e.currentTarget.dataset.detailed == 'Time Stamp') {

            headerSort[1].classList.add('hideSort')

            e.currentTarget.classList.remove('hideSort')

            if (e.currentTarget.checked) {
                // Sort Descending
                tableSortRows.sort((first, next) => {
                    return new Date(next.children[1].textContent) - new Date(first.children[1].textContent)
                })

                tableSortRows.forEach(sortRow => tableBody.appendChild(sortRow))

            } else {
                sortPriorTimeASC();
            }
        }
        else {

            headerSort[0].classList.add('hideSort')

            e.currentTarget.classList.remove('hideSort')

            if (e.currentTarget.checked) {
                // Sort in Descending
                tableSortRows.sort((first, next) => {
                    return next.children[2].textContent - first.children[2].textContent;
                })
            } else {
                // Sort in Ascending
                tableSortRows.sort((first, next) => {
                    return first.children[2].textContent - next.children[2].textContent
                })
            }

            tableSortRows.forEach(sortRow => tableBody.appendChild(sortRow))
        }
    });
})

// END !SECTION Sorting Log Table

// SECTION Adding New Log

// Submit Log Button Element
const logButton = document.querySelector('.button.icon-Button.log#logButton');

// Log Input Elements
const selectOption = document.querySelector('.table-input>.input-book-log>div.select-option.wrapper>div.selected>li')
const bookPageInput = document.querySelector('.input.input-bookLog#bookPage')
const timeStampRead = document.querySelector('.input.input-bookLog#timestamp')
const bookLog = document.querySelector('.input.input-bookLog#bookLog')

// Date in format YYYY-MM-DD HH:mm
function getDate() {
    let currentDate = new Date()
    function appendZero(num) {
        if (num < 10) return '0' + num
        else return num
    }

    return '' + currentDate.getFullYear() + '-' + appendZero(currentDate.getMonth() + 1) + '-' + appendZero(currentDate.getDate()) + ' ' + appendZero(currentDate.getHours()) + ':' + appendZero(currentDate.getMinutes())
}

// Set Max to Today
timeStampRead.addEventListener('click', e => {
    timeStampRead.max = getDate().replace(' ', 'T')
})

// SECTION New Log HTML Creation
function addNewDefaultRow(logTypeTextInput, logTypeImgInput, pageInput, timeStampReadInput, bookLogInput, logName, bookName) {

    const newRow = document.createElement('tr')
    newRow.classList.add('default')
    newRow.id = logName
    newRow.dataset.book = bookName

    // ANCHOR Set Icon Data
    const newIconData = document.createElement('td')
    newIconData.className = 'body body-iconState'
    newIconData.getAttribute('rowspan', '1')

    const iconWrapper = document.createElement('div')
    iconWrapper.classList.add('iconWrapper')

    const iconImg = document.createElement('img')
    iconImg.className = 'icon'
    iconImg.setAttribute('src', logTypeImgInput)
    iconImg.setAttribute('alt', logTypeTextInput)

    iconWrapper.appendChild(iconImg)
    newIconData.appendChild(iconWrapper)

    // ANCHOR Set TimeStamp Data
    const newtimeStampData = document.createElement('td')
    newtimeStampData.className = 'body body-timeStamp sort'
    newtimeStampData.textContent = timeStampReadInput

    // ANCHOR Set onPage Data
    const newPage = document.createElement('td')
    newPage.className = 'body body-onPage sort'
    newPage.textContent = pageInput

    // ANCHOR Set LogDesc Data
    const newLog = document.createElement('td')
    newLog.className = 'body body-entryLog'
    const newlogDesc = document.createElement('div')
    newlogDesc.className = 'logDesc'
    newlogDesc.textContent = bookLogInput

    newLog.appendChild(newlogDesc)

    // ANCHOR Set Arrow Option
    const newArrowLook = document.createElement('td')
    newArrowLook.className = 'body body-editArrow'
    const arrowIcon = document.createElement('input')
    arrowIcon.className = 'input input-checkBox button button-Row'
    arrowIcon.setAttribute('type', 'checkbox')
    newArrowLook.appendChild(arrowIcon)

    // ANCHOR Append to new Row
    newRow.appendChild(newIconData)
    newRow.appendChild(newtimeStampData)
    newRow.appendChild(newPage)
    newRow.appendChild(newLog)
    newRow.appendChild(newArrowLook)

    tableBody.appendChild(newRow)

    newRow.scrollIntoView();

    logRowEvent(newRow)

    // Set Sort Order by ASC
    sortPriorTimeASC();

}
// END !SECTION New Log HTML Creation

// ANCHOR Log Submit Event Handler
function submitNewLog() {

    if (bookLog.value == '') {
        return false;
    }

    // Adding Log Row to Object
    let bookName = document.querySelector('tr.default').dataset.book;

    // Creating a Unique ID for LogRow
    let logName = `default-${new Date()}`;

    let logTypeTextInput = selectOption.children[0].getAttribute('alt');
    let logTypeImgInput = selectOption.children[0].getAttribute('src');

    let pageInput = bookPageInput.value;
    if (pageInput == "")
        pageInput = library[bookName].haveRead;

    let timeStampReadInput = timeStampRead.value.replace('T', ' ');
    if (timeStampReadInput == "")
        timeStampReadInput = getDate();

    let bookLogInput = bookLog.value;

    // if (bookLog.value == "") 
    //     bookLogInput = ''
    // else
    //     bookLogInput = bookLog.value

    // Add to Data Object
    library[bookName].logs[logName] = {}
    library[bookName].logs[logName]['body-iconState'] = {}

    library[bookName].logs[logName]['body-iconState']['src'] = logTypeImgInput
    library[bookName].logs[logName]['body-iconState']['alt'] = logTypeTextInput
    library[bookName].logs[logName]['body-timeStamp'] = timeStampReadInput
    library[bookName].logs[logName]['body-onPage'] = pageInput
    library[bookName].logs[logName]['body-entryLog'] = bookLogInput

    setTotalPage();

    //Create HTML LINK layout.js:15
    addNewDefaultRow(logTypeTextInput, logTypeImgInput, pageInput, timeStampReadInput, bookLogInput, logName, bookName)

    // Reset All Log Inputs
    bookPageInput.value = ''
    timeStampRead.value = ''
    bookLog.value = ''
    selectOption.children[0].setAttribute('alt', 'Comment');
    selectOption.children[0].setAttribute('src', './assets/web/svg-icons/comment.svg')
    selectOption.children[1].textContent = 'Comment'
}

// ANCHOR Log Submit Event Listener
logButton.addEventListener('click', submitNewLog);

// END !SECTION Add New Log Row

// SECTION Display Detailed Row
// LINK index.html:395

// 3.2 SECTION Edit Log Button Event
function editLogButtonEvent(editLogButton, defaultRow, dataObject, logTypeImageInit) {

    editLogButton.addEventListener('click', () => {

        // console.log(dataObject)

        // Div made Select Input
        selectOption.children[0].setAttribute('src', logTypeImageInit)
        selectOption.children[0].setAttribute('alt', dataObject['Log Type'])

        // Div as Select Change
        selectOption.children[1].textContent = dataObject['Log Type']

        // Update bookPage Input Element
        bookPageInput.value = dataObject['In Page']

        // Update timeStampRead Input Element
        timeStampRead.value = dataObject['Reading Date'].replace(' ', 'T')

        // Update bookLog Input Element
        bookLog.value = dataObject['Log Description'].replace(/ {2,}/g, "")

        // Remove Event Listerner for Submit Button
        logButton.removeEventListener('click', submitNewLog);

        // Update Class from Submit Button to Update Button
        logButton.className = 'button icon-Button log updateLog'


        // 3.2.1 ANCHOR Trigger on Update Log Button
        document.querySelector('.button.icon-Button.log.updateLog#logButton').addEventListener('click', () => {
            if (bookLog.value == '') {
                return false;
            }

            let logValue = library[defaultRow.dataset.book].logs[defaultRow.id]

            // Get Current atrtibutes of Div Made Selection Element
            selectImg = selectOption.children[0].getAttribute('src')
            selectAlt = selectOption.children[0].getAttribute('alt')

            // Get Page Input and Update to None
            let inputedPage = bookPageInput.value
            bookPageInput.value = ""

            // Get Timestamp Input and Update to None
            let initDate = timeStampRead.value.split('T')
            let inputDate = initDate[0] + ' ' + initDate[1]

            timeStampRead.value = ''

            // Get Book Log Input and Update to None
            let inputLog = bookLog.value
            bookLog.value = ""

            // Add to DefaultRow
            // Default Row Elements
            const logTypeImage = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img')
            const logTypeText = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img')
            const readDate = defaultRow.querySelector(':scope>td.body.body-timeStamp')
            const readPage = defaultRow.querySelector(':scope>td.body.body-onPage')
            const entryLog = defaultRow.querySelector(':scope>td.body.body-entryLog>div.logDesc')

            logTypeImage.setAttribute('src', selectImg)
            logTypeText.setAttribute('alt', selectAlt)

            logValue['body-iconState']['src'] = selectImg
            logValue['body-iconState']['alt'] = selectAlt

            readPage.textContent = inputedPage
            logValue['body-onPage'] = inputedPage

            readDate.textContent = inputDate
            logValue['body-timeStamp'] = inputDate

            entryLog.textContent = inputLog
            logValue['body-entryLog'] = inputLog

            // Remove Hidden Row
            defaultRow.nextElementSibling.remove()
            defaultRow.firstElementChild.setAttribute('rowspan', '1')

            // Change from Update to Submit Button
            updateLogButton.className = 'button icon-Button log submitLog'

            // Add Event Listener for Submit Button
            logButton.addEventListener('click', submitNewLog);

            // Re-Initiate Hidden Row Creation
            // LINK layout.js:179
            hiddenRowPreWork(defaultRow)

            defaultRow.nextElementSibling.scrollTop = 0;

        }, { once: true })
    })
}
// END !SECTION Edit Log Button Event

// 3.1 SECTION Remove Log Button Event
function removeLogButtonEvent(removeLogButton, defaultRow) {
    removeLogButton.addEventListener('click', () => {
        defaultRow.nextElementSibling.remove()
        delete library[defaultRow.dataset.book].logs[defaultRow.id]
        defaultRow.remove();
    })
}
// END !SECTION Remove Log Button Event

// 3. SECTION Create Detailed Row
function createDetailRow(defaultRow, dataObject, logTypeImage) {

    const detailRow = document.createElement('tr')
    detailRow.className = 'revealOnClick'

    const detailRowData = document.createElement('td')
    detailRowData.setAttribute('colspan', '5')

    const detailRowDiv = document.createElement('div')
    detailRowDiv.className = 'hiddenRow'

    // ANCHOR Add DataList <dl> 
    // for each Element
    for (data in dataObject) {
        // Hidden List
        const detailedList = document.createElement('dl')
        detailedList.className = 'revealOnClick-list'

        // Hidden List Term
        const detailedListTerm = document.createElement('dt')
        detailedListTerm.className = 'revealOnClick-listTerm'
        detailedListTerm.textContent = data

        // Hiddent List Definition
        const detailedListDef = document.createElement('dd')
        detailedListDef.className = 'revealOnClick-listDefinition'
        detailedListDef.textContent = dataObject[data]

        detailedList.appendChild(detailedListTerm)
        detailedList.appendChild(detailedListDef)

        detailRowDiv.appendChild(detailedList)
    }

    // Hidden Icon List
    const logEditButtons = document.createElement('div')
    logEditButtons.className = 'revealOnClick-list logEditButtons'

    // Icon Log Edit Button
    const editLogButton = document.createElement('button')
    editLogButton.className = 'button button-image editLog'
    const editLogIcon = document.createElement('span')
    editLogIcon.className = 'icon-Button editLog'

    editLogButton.appendChild(editLogIcon)

    // Icon Log Remove Button
    const removeLogButton = document.createElement('button')
    removeLogButton.className = 'button button-image removeLog'
    const removeLogIcon = document.createElement('span')
    removeLogIcon.className = 'icon-Button removeLog'

    removeLogButton.appendChild(removeLogIcon)

    // Creating Events for Edits and Remove Button
    // LINK layout.js:114
    editLogButtonEvent(editLogButton, defaultRow, dataObject, logTypeImage);
    // LINK layout.js:209
    removeLogButtonEvent(removeLogButton, defaultRow);

    // Adding Log Edit Buttons to Detail Row's Div
    logEditButtons.appendChild(editLogButton)
    logEditButtons.appendChild(removeLogButton)

    detailRowDiv.appendChild(logEditButtons)

    // Adding Div to Table Data & Table Row
    detailRowData.appendChild(detailRowDiv)
    detailRow.appendChild(detailRowData)

    // Appending Hidden Row before the Default's Row Sibling
    defaultRow.parentNode.insertBefore(detailRow, defaultRow.nextSibling)

    defaultRow.scrollIntoView({ behavior: 'auto' /*or smooth*/, block: 'center' })
}
// END !SECTION Create's Detailed Row

// 2. ANCHOR Prepare defaultRow
function hiddenRowPreWork(defaultRow) {

    // defaultRow Child Elements Values
    const logTypeImage = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img').getAttribute('src');
    const logTypeText = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img').getAttribute('alt');
    const readDate = defaultRow.querySelector(':scope>td.body.body-timeStamp').textContent;
    const readPage = defaultRow.querySelector(':scope>td.body.body-onPage').textContent;
    const entryLog = defaultRow.querySelector(':scope>td.body.body-entryLog>div.logDesc').textContent;

    // Check on ClassName
    if (defaultRow.classList.contains('rowRevealed')) {

        // First Child Sticky to Hidden Row
        defaultRow.children[0].setAttribute('rowspan', '2');

        // Hidden Row Creation
        // LINK layout.js:102
        createDetailRow(defaultRow,
            {
                "Reading Date": readDate,
                "Log Type": logTypeText,
                "In Page": readPage,
                "In Progress": `${library[defaultRow.dataset.book].logs[defaultRow.id]['body-onProgress']()}%`,
                "Log Description": entryLog
            }, logTypeImage
        );

        // Indicate Open State on Arrow
        defaultRow.lastElementChild.children[0].checked = true;

    } else {
        // Set to Default if Hidden Row not Revealed
        // LINK layout.js:331
        setToDefault(defaultRow)
    }
}

// 2.1 ANCHOR Set to Default Values
function setToDefault(row) {
    row.classList.remove('rowRevealed');
    row.children[0].setAttribute('rowspan', '1')

    // Click Default Row removes Hidden Row
    if (row.nextElementSibling != undefined && row.nextElementSibling.className == 'revealOnClick') {
        row.nextElementSibling.remove();
    }

    row.lastElementChild.children[0].checked = false
}

function logRowEvent(defaultRow) {

    defaultRow.addEventListener('click', e => {
        // 1. Toggling Class on Event
        e.currentTarget.classList.toggle('rowRevealed')

        for (let rowPresent of document.querySelectorAll('tr.default')) {
            // console.log(rowDefault)

            // For Other row's on Not Click
            if (rowPresent !== e.currentTarget) {
                // LINK layout.js:331
                setToDefault(rowPresent)
            }
        }

        // Start PreWork for Hidden Row
        // LINK layout.js:292
        hiddenRowPreWork(e.currentTarget);
    })
}

// END !SECTION Display Detailed Row


// SECTION Dropdown Imitation
// LINK index.html:631

// Div as Select Elements
const divSelect = document.querySelector('.selected')
const divSelectList = document.querySelector('.list-select')

const divSelectOptions = document.querySelectorAll('.list-selectOptions>li')

// Clicking on the Div Select Element
divSelect.addEventListener('click', () => {

    // Show Display
    divSelectList.classList.toggle('displayNone');

    divSelectOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            // console.log(event.currentTarget)

            // Get Attributes of Children
            let imgSrc = event.currentTarget.children[0].getAttribute('src')
            let textSrc = event.currentTarget.children[1].textContent

            // Set Attributes on DropDown Header
            divSelect.children[0].children[0].setAttribute('src', imgSrc)
            divSelect.children[0].children[0].setAttribute('alt', textSrc)
            divSelect.children[0].children[1].textContent = textSrc

            // Close divSelectOptions after Selection
            divSelectList.classList.add('displayNone');

        })
    })

    // Close on click outside the divSelectOptions
    document.body.addEventListener('click', (e) => {
        // console.log(e.target)

        const divSelectli = divSelect.children[0]

        // Ensure Closure of DropDown
        if (!e.target.closest('.list-select') &&
            // Also close on clicking Dropdown head or any of its children
            !(e.target == divSelect || e.target == divSelectli || e.target == divSelectli.children[0] || e.target == divSelectli.children[1])
        ) {
            divSelectList.classList.add('displayNone');
        }
    })
})

// END !SECTION Dropdown Imitation

// END !SECTION Section 2 - Book Logs

// END !SECTION Book - Section 2

// ANCHOR Cancel Book Add / Edit

// Empty the Inputs
function clearAll() {
    picShowOnEdit.setAttribute('src', './assets/web/svg-images/book/book3.svg')
    picInput.value = ''
    titleInput.value = ''
    authorInput.value = ''
    pageRead.value = ''
    pageTotal.value = ''
    labelInput.value = ''
    selectOption.children[0].setAttribute('alt', 'Comment');
    selectOption.children[0].setAttribute('src', './assets/web/svg-icons/comment.svg')
    selectOption.children[1].textContent = 'Comment'

    inputAll.forEach(input => input.querySelector('input').classList.remove('valid'))

    const bookStatusDef = document.querySelector(`input.input.input-radioStatus[name="book-status"]:checked`)
    if (bookStatusDef)
        bookStatusDef.checked = false

    const ratingDef = document.querySelector(`div.ratingControl>input[name="rating"]:checked`)
    if (ratingDef)
        ratingDef.checked = false

    // Clear All Error Messages
    document.querySelectorAll('span.error-text').forEach(text => {
        text.textContent = '';
        text.previousElementSibling.classList.remove('invalid')
        text.previousElementSibling.classList.remove('valid')
    })

    logTableBody.textContent = ''
}

cancelBookPopup.addEventListener('click', e => {
    popupOverlay.classList.add('displayNone');
    clearAll();
})

// END !SECTION Overlay Popup

// ANCHOR Add / Edit Book
const addBookPopup = document.querySelector('button.button-fixed.bookAdd')


addBookPopup.addEventListener('click', e => {
    popupOverlay.classList.remove('displayNone')

    cancelBookPopup.classList.remove('edit')
    cancelBookPopup.classList.add('add')

    saveBookPopup.classList.remove('edit')
    saveBookPopup.classList.add('add')

    radioTab[0].checked = true;
    radioTab[1].disabled = true;
    bookSection2.scrollTop = 0

    // SECTION Save Add Book
    document.querySelector('button.button.saveBook.add').addEventListener('click', e => {
        const newBookId = `book-${new Date().toISOString()}`

        const bookRate = document.querySelector(`div.ratingControl>input[name="rating"]:checked`)
        const newBookRating = bookRate ? bookRate.value : '0.0'

        // Add Object Entry
        library[newBookId] = new book(
            titleInput.value.trim(),
            authorInput.value.trim(),
            pageRead.value.trim(),
            pageTotal.value.trim(),
            document.querySelector(`input.input.input-radioStatus[name="book-status"]:checked`).value,
            newBookRating,
            labelInput.value.replace(' ', '').split(',').filter(Boolean),
            picInput.value.trim()
        )

        createBookOverview(newBookId, library[newBookId])

        popupOverlay.classList.add('displayNone');
        clearAll();

    }, { once: true })

    // Close on Click Outside Menu
    popupOverlay.addEventListener('click', (e) => {
        // console.log(new Date().toLocaleTimeString(), e.target.closest('main.popup'))
        if (!e.target.closest('main.popup'))
            popupOverlay.classList.add('displayNone')
    })

    // END !SECTION Save Add Book
})