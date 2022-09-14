// SECTION Book Overview

// SECTION Create Book Overview

// Change Image
// ANCHOR Image
function changeBookImage(book) {
    const bookOvImage = document.createElement('img')
    bookOvImage.className = 'image image-book overview'
    bookOvImage.setAttribute('src', book['imageSrc'])
    bookOvImage.setAttribute('alt', `${book}-Image`)

    return bookOvImage
}

// ANCHOR Author
function changeAuthor(book) {
    const author = document.createElement('h5')
    author.className = 'heading heading-bookAuthor'
    author.textContent = book['author']

    return author
}

// ANCHOR Heading
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

// ANCHOR Rating
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

// ANCHOR Progress
function changeProgress(book) {
    if (book.bookStatus == 'In-Progress') {
        // Show Number of Pages Left
        const progressDiv = document.createElement('div')
        progressDiv.className = 'progress progress-pages'

        const progressLeft = document.createElement('span')
        progressLeft.className = 'progress-pageLeft'
        progressLeft.textContent = book.haveRead

        const progressNoun = document.createElement('span')
        progressNoun.className = 'progress-pageNoun'
        progressNoun.textContent = `pages`

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

// ANCHOR Tags
let bookTags = [[], []]
let bookTagsCSS = '';

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

        bookTagsCSS += `.label-${tag}{ background-color : rgb(${rgbValues.toString()})}`
        bookTags[0].push(tag)
        bookTags[1].push([rgbValues])

        // Label in Filter Section
        const label = document.createElement('input')
        label.setAttribute('type', 'checkbox')
        label.className = `input input-checkBox label-${tag}`
        label.id = `${tag}Label`
        label.setAttribute('data-detailed', `# ${tag}`)
        label.checked = true;
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
        spanLabel.className = `bookLabels label-${tag}`
        spanLabel.textContent = tag.charAt(0).toUpperCase() + tag.slice(1)

        bookLabelWrapper.appendChild(spanLabel)
    }

    // Append Style Element
    document.querySelector('style').remove()
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css');
    style.textContent = bookTagsCSS;
    document.querySelector('head').appendChild(style);

    bookLabel.appendChild(bookLabelWrapper)

    return bookLabel
}

// ANCHOR Edit Book Buttons
function addEditButtons(book) {
    const bookEditCheckBox = document.createElement('input')
    bookEditCheckBox.setAttribute('type', 'checkbox')
    bookEditCheckBox.setAttribute('name', 'edit-book')
    bookEditCheckBox.className = 'input input-bookEdit'

    // ANCHOR Edit Book Buttons
    const bookEditDisp = document.createElement('div')
    bookEditDisp.className = 'books-bookEdits displayNone'

    // Buttons Edit
    const buttonEdit = document.createElement('button')
    buttonEdit.className = 'button button-bookEdit editBook'
    const buttonEditSpan = document.createElement('span')
    buttonEditSpan.className = 'icon-Button editBook'
    buttonEdit.appendChild(buttonEditSpan)
    buttonEdit.appendChild(document.createTextNode('Edit'))
    bookEditDisp.appendChild(buttonEdit)

    // Buttons Log
    const buttonLog = document.createElement('button')
    buttonLog.className = 'button button-bookEdit logBook'
    const buttonLogSpan = document.createElement('span')
    buttonLogSpan.className = 'icon-Button logBook'
    buttonLog.appendChild(buttonLogSpan)
    buttonLog.appendChild(document.createTextNode('Log'))
    bookEditDisp.appendChild(buttonLog)

    // Buttons Delete
    const buttonDel = document.createElement('button')
    buttonDel.className = 'button button-bookEdit removeBook'
    const buttonDelSpan = document.createElement('span')
    buttonDelSpan.className = 'icon-Button removeBook'
    buttonDel.appendChild(buttonDelSpan)
    buttonDel.appendChild(document.createTextNode('Delete'))
    bookEditDisp.appendChild(buttonDel)

    return [bookEditCheckBox, bookEditDisp]
}

// Create A book for Initial Values Set on
// LINK data.js
const bodySec = document.querySelector('section.body')

for (let [bookName, bookValue] of Object.entries(library)) {

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

    bodySec.appendChild(bookOverview)
}

// END !SECTION Create Book Overview

// SECTION Book Edit Button Dialog
// TODO Check to Edit For Each
const bookEditCheck = document.querySelectorAll('input.input.input-bookEdit')

bookEditCheck.forEach(bookEdit => {
    bookEdit.addEventListener('change', e => {
        e.currentTarget.nextElementSibling.classList.toggle('displayNone')
    })
})

// Radio Tabs
const radioTab = document.querySelectorAll('input.input.input-radioTab')

// ANCHOR Book Edit Buttons

const popupOverlay = document.querySelector('section.popup-overlay');

function setBookOverview(book) {

}

// Edit Button
const bookEditButtons = document.querySelectorAll('button.button.button-bookEdit.editBook')

bookEditButtons.forEach(bookEditButton => {
    bookEditButton.addEventListener('click', e => {
        setBookOverview(e.currentTarget.parentElement.parentElement.id)
        popupOverlay.classList.remove('displayNone')
        radioTab[0].checked = true;
    })
})

const logTableBody = document.querySelector('tbody.table.table-body')

// SECTION Set Book Logs
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

// Log Button
const bookLogButtons = document.querySelectorAll('button.button.button-bookEdit.logBook')

bookLogButtons.forEach(bookLogButton => {
    bookLogButton.addEventListener('click', e => {
        setBookLogOverview(e.currentTarget.parentElement.parentElement.id);
        sortPriorTimeASC();

        popupOverlay.classList.remove('displayNone')
        radioTab[1].checked = true;
    })

})

// END !SECTION Set Log Book

// Delete Button
const bookDeleteButtons = document.querySelectorAll('button.button.button-bookEdit.removeBook')

bookDeleteButtons.forEach(bookDeleteButton => {
    bookDeleteButton.addEventListener('click', e => {
        delete library[e.currentTarget.parentElement.parentElement.id]
        e.currentTarget.parentElement.parentElement.remove()
    })
})

// END !SECTION Book Edit Dialog

// END !SECTION Book Overview

// SECTION Overlay Popup

// SECTION Section 1

// Image to be revealed
const bookImage = document.querySelector('.image.image-book.edit');

// Image Input URL
const imageURLInput = document.querySelector('.input.input-type.imageUrl');

// Button for Image 
const buttonAddImage = document.querySelector('.button.button-image.addImage');
const buttonRemoveImage = document.querySelector('.button.button-image.removeImage');

// Event on Input URL Image
imageURLInput.addEventListener('focusout', e => {
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
            bookImage.setAttribute('src', imageURLInput.value)
        } else {
            bookImage.setAttribute('src', './assets/web/svg-images/book/book3.svg')
        }
        // TODO Add Image to Image Section
    })
})

// END !SECTION Section 1

// SECTION Section 2

// SECTION Book Detail

// All the Inputs
const inputs = Array.from(document.querySelectorAll('.tabWindow-bookDetails>.input-element:not(.radioCheck)'))

// Page Number Inputs
const inputPage = Array.from(document.querySelectorAll('.tabWindow-bookDetails>.input-element.page>input'))

// Radio Check Inputs
const inputPageCheck = Array.from(document.querySelectorAll('.input-element.radioCheck>input'))

inputs.forEach(input => {

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
                    inputPage[0].nextElementSibling.textContent = 'Value can\'t be less than Total Page'
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

// SECTION Book Logs Table

// SECTION Sort Default Rows

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

sortPriorTimeASC();

// Sorting Headers
const headerSort = Array.from(document.querySelectorAll('.input.input-checkBox.header'))

headerSort.forEach((sortHead) => {
    sortHead.addEventListener('click', e => {

        const tableSortRows = Array.from(tableBody.children)

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

// END !SECTION Sort Default Rows


// SECTION Add New Log

// Submit Log Button Element
const logButton = document.querySelector('.button.icon-Button.log#logButton');

// Input Elements
const selectOption = document.querySelector('.table-input>.input-book-log>div.select-option.wrapper>div.selected>li')
const bookPageInput = document.querySelector('.input.input-bookLog#bookPage')
const timeStampRead = document.querySelector('.input.input-bookLog#timestamp')
const bookLog = document.querySelector('.input.input-bookLog#bookLog')

function getDate() {
    let currentDate = new Date()
    function appendZero(num) {
        if (num < 10) return '0' + num
        else return num
    }

    return '' + currentDate.getFullYear() + '-' + appendZero(currentDate.getMonth() + 1) + '-' + appendZero(currentDate.getDate()) + ' ' + appendZero(currentDate.getHours()) + ':' + appendZero(currentDate.getMinutes())
}

// Limit Date
timeStampRead.addEventListener('click', e => {
    e.currentTarget.setAttribute('max', Date(getDate().replace(' ', 'T')))
})

function addLogRow(logTypeTextInput, logTypeImgInput, pageInput, timeStampReadInput, bookLogInput, logName, bookName) {

    // SECTION Creating New Row
    const newRow = document.createElement('tr')
    newRow.classList.add('default')
    newRow.id = logName
    newRow.dataset.book = bookName

    // ANCHOR Icon Data
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

    // ANCHOR TimeStamp Data
    const newtimeStampData = document.createElement('td')
    newtimeStampData.className = 'body body-timeStamp sort'
    newtimeStampData.textContent = timeStampReadInput

    // ANCHOR onPage Data
    const newPage = document.createElement('td')
    newPage.className = 'body body-onPage sort'
    newPage.textContent = pageInput

    // ANCHOR LogDesc Data
    const newLog = document.createElement('td')
    newLog.className = 'body body-entryLog'
    const newlogDesc = document.createElement('div')
    newlogDesc.className = 'logDesc'
    newlogDesc.textContent = bookLogInput

    newLog.appendChild(newlogDesc)

    // ANCHOR Arrow Option
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

    // END !SECTION Creating New Row

    tableBody.appendChild(newRow)

    newRow.scrollIntoView();

    logRowEvent(newRow)

    // Set Sort Order by ASC
    sortPriorTimeASC();

}

// Submit Button Action
function submitNewLog() {
    // Adding Log Row to Object
    let bookName = document.querySelector('tr.default').dataset.book;
    // Creating a Unique ID for LogRow
    let logName = `default-${new Date()}`;

    let logTypeTextInput = selectOption.children[0].getAttribute('alt');
    let logTypeImgInput = selectOption.children[0].getAttribute('src');

    let pageInput = bookPageInput.value;
    let timeStampReadInput = timeStampRead.value;
    let bookLogInput = bookLog.value;

    // if (bookLog.value == "") 
    //     bookLogInput = ''
    // else
    //     bookLogInput = bookLog.value

    if (timeStampReadInput == "")
        timeStampReadInput = getDate();

    if (pageInput == "")
        pageInput = library[bookName].haveRead;

    // LINK layout.js:15
    addLogRow(logTypeTextInput, logTypeImgInput, pageInput, timeStampReadInput, bookLogInput, logName, bookName)

    library[bookName].logs[logName] = {}
    library[bookName].logs[logName]['body-iconState'] = {}

    library[bookName].logs[logName]['body-iconState']['src'] = logTypeImgInput
    library[bookName].logs[logName]['body-iconState']['alt'] = logTypeTextInput
    library[bookName].logs[logName]['body-timeStamp'] = timeStampReadInput
    library[bookName].logs[logName]['body-onPage'] = pageInput
    library[bookName].logs[logName]['body-entryLog'] = bookLogInput

    setTotalPage();
}

// Submit Button Event Listener
logButton.addEventListener('click', submitNewLog);

// END !SECTION Add New Row


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
        dates = dataObject['Reading Date'].split(' ')
        dates_original = dates[0] + 'T' + dates[1]
        timeStampRead.value = dates_original

        // Update bookLog Input Element
        bookLog.value = dataObject['Log Description'].replace(/ {2,}/g, "")

        // Remove Event Listerner for Submit Button
        logButton.removeEventListener('click', submitNewLog);

        // Update Class from Submit Button to Update Button
        logButton.className = 'button icon-Button log updateLog'

        // Select Update Button
        const updateLogButton = document.querySelector('.button.icon-Button.log.updateLog#logButton');


        // 3.2.1 ANCHOR Trigger on Update Button
        updateLogButton.addEventListener('click', () => {
            if (bookLog.value == null) {
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

            // Change Class from Update to Submit Button
            updateLogButton.className = 'button icon-Button log submitLog'

            // Add Event Listener for Submit Button
            logButton.addEventListener('click', submitNewLog);


            // Re-Initiate Hidden Row Creation
            // LINK layout.js:179
            hiddenRowPreWork(defaultRow)

            defaultRow.scrollIntoView();

        }, { once: true })
    })
}
// END !SECTION Edit Button Event

// 3.1 SECTION Remove Log Button Event
function removeLogButtonEvent(removeLogButton, defaultRow) {
    removeLogButton.addEventListener('click', () => {
        defaultRow.nextElementSibling.remove()
        delete library[defaultRow.dataset.book].logs[defaultRow.id]
        defaultRow.remove();
    })
}
// END !SECTION On Remove Button Event

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

// 2. SECTION Prepare defaultRow
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
// END !SECTION Prepare defaultRow

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

// END !SECTION Book Logs Table

// END !SECTION Section 2

// ANCHOR Cancel Book Add / Edit
const cancelBookPopup = document.querySelector('button.button-fixed.bookCancel')

cancelBookPopup.addEventListener('click', e => {
    popupOverlay.classList.add('displayNone')
})

// END !SECTION Overlay Popup

// ANCHOR Add / Edit Book
const addBookPopup = document.querySelector('button.button-fixed.bookAdd')

addBookPopup.addEventListener('click', e => {
    popupOverlay.classList.remove('displayNone')
})