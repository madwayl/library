// SECTION Sort Default Rows

// Table Body
const tableBody = document.querySelector('tbody.table.table-body')

const tableRowSorting = Array.from(tableBody.children);

// Sort by Ascending Prior on TimeStamp
tableRowSorting.sort((first, next) => {
    return new Date(first.children[1].textContent) - new Date(next.children[1].textContent)
})

tableRowSorting.forEach(sortRow => tableBody.appendChild(sortRow))

// Sorting Headers
const headerSort = document.querySelector('.head-timeStamp>.input.input-checkBox.header')

headerSort.addEventListener('click', e => {

    const newTableSort = [...tableRowSorting]

    if (headerSort.dataset.detailed == 'Time Stamp') {
        if (headerSort.checked) {
            // Sort Descending
            newTableSort.sort((first, next) => {
                return new Date(next.children[1].textContent) - new Date(first.children[1].textContent)
            })
        }
    }
    else {
        if (headerSort.checked) {
            // Sort in Descending
            newTableSort.sort((first, next) => {
                return next.children[2].textContent - first.children[2].textContent;
            })
        } else {
            // Sort in Ascending
            newTableSort.sort((first, next) => {
                return first.children[2].textContent - next.children[2].textContent
            })
        }
    }

    newTableSort.forEach(sortRow => tableBody.appendChild(sortRow))
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

function addLogRow(logTypeTextInput, logTypeImgInput, page, timeStampReadInput, bookLogInput) {
    // SECTION Creating New Row
    const newRow = document.createElement('tr')
    newRow.classList.add('default')
    date = new Date()

    // Creating a Unique ID for Row
    uniqueID = new Date().toISOString()

    newRow.setAttribute('id', `default${uniqueID}`)

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
    newtimeStampData.className = 'body body-timeStamp'
    newtimeStampData.textContent = timeStampReadInput

    // ANCHOR onPage Data
    const newPage = document.createElement('td')
    newPage.className = 'body body-onPage'
    newPage.textContent = page

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

    newRow.addEventListener('click', toggleRowClass)
}

// Submit Button Action
function submitNewLog(e) {
    let logTypeTextInput, logTypeImgInput, page, timeStampReadInput, bookLogInput;

    logTypeTextInput = selectOption.children[0].getAttribute('alt')
    logTypeImgInput = selectOption.children[0].getAttribute('src')

    if (bookLog.value == "") bookLogInput = ''

    if (timeStampRead.value == "") {
        timeStampReadInput = getDate()
    }

    // TODO Change After Object Creation
    if (bookPageInput.value == "") page = 321

    // LINK layout.js:15
    addLogRow(logTypeTextInput, logTypeImgInput, page, timeStampReadInput, bookLogInput)
}

// Submit Button Event Listener
logButton.addEventListener('click', submitNewLog);

// END !SECTION Add New Row


// SECTION Display Detailed Row
// LINK index.html:395

// Default Row Selected
const tableRows = document.querySelectorAll('tr.default')

// 3.2 SECTION Edit Button Event
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

            // Get Current atrtibutes of Div Made Selection Element
            selectImg = selectOption.children[0].getAttribute('src')
            selectAlt = selectOption.children[0].getAttribute('alt')

            // Get Page Input and Update to None
            inputPage = bookPageInput.value
            bookPageInput.value = ""

            // Get Timestamp Input and Update to None
            initDate = timeStampRead.value.split('T')
            inputDate = initDate[0] + ' ' + initDate[1]

            timeStampRead.value = ''

            // Get Book Log Input and Update to None
            inputLog = bookLog.value
            bookLog.value = ""

            // Add to DefaultRow
            const logTypeImage = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img')
            const logTypeText = defaultRow.querySelector(':scope>td.body.body-iconState>div.iconWrapper>img')
            const readDate = defaultRow.querySelector(':scope>td.body.body-timeStamp')
            const readPage = defaultRow.querySelector(':scope>td.body.body-onPage')
            const entryLog = defaultRow.querySelector(':scope>td.body.body-entryLog>div.logDesc')

            logTypeImage.setAttribute('src', selectImg)
            logTypeText.setAttribute('alt', selectAlt)

            readPage.textContent = inputPage
            readDate.textContent = inputDate
            entryLog.textContent = inputLog

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

// 3.1 SECTION Remove Button Event
function removeLogButtonEvent(removeLogButton, defaultRow) {
    removeLogButton.addEventListener('click', () => {
        defaultRow.nextElementSibling.remove()
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
                // TODO Change After Object Creation
                "In Progress": "12%",
                "Log Description": entryLog
            }, logTypeImage
        );

        // Indicate Open State on Arrow
        defaultRow.lastElementChild.children[0].checked = true;

    } else {
        // Set to Default if Hidden Row not Revealed
        // LINK layout.js:331
        setDefault(defaultRow)
    }
}
// END !SECTION Prepare defaultRow

// 2.1 ANCHOR Set to Default Values
function setDefault(row) {
    row.classList.remove('rowRevealed');
    row.children[0].setAttribute('rowspan', '1')

    // Click Default Row removes Hidden Row
    if (row.nextElementSibling != undefined && row.nextElementSibling.className == 'revealOnClick') {
        row.nextElementSibling.remove();
    }

    row.lastElementChild.children[0].checked = false
}

// 1. Toggling Class on Event
function toggleRowClass(e) {
    e.currentTarget.classList.toggle('rowRevealed')

    for (let rowPresent of tableRows) {
        // console.log(rowDefault)

        // For Other row's on Not Click
        if (rowPresent !== e.currentTarget) {
            // LINK layout.js:331
            setDefault(rowPresent)
        }
    }

    // Start PreWork for Hidden Row
    // LINK layout.js:292
    hiddenRowPreWork(e.currentTarget);
}

// Event for Each Present Row
tableRows.forEach(row => row.addEventListener('click', toggleRowClass));

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