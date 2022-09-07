
// SECTION Display Detailed Row on Table Row Click
// LINK index.html:395

// Default Row Selected
const tableRows = document.querySelectorAll('tr.default')

// Input Elements
const selectOption = document.querySelector('.table-input>.input-book-log>div.select-option.wrapper>div.selected>li')
const bookPageInput = document.querySelector('.input.input-bookLog#bookPage')
const timeStampRead = document.querySelector('.input.input-bookLog#timestamp')
const bookLog = document.querySelector('.input.input-bookLog#bookLog')

// Submit Log Button Element
const submitLogButton = document.querySelector('.button.icon-Button.submitLog#logButton')

// SECTION On Edit Button Event
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

        // ANCHOR Trigger on Submit Button
        submitLogButton.addEventListener('click', () => {
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

            // Re-Initiate Hidden Row Creation
            // LINK layout.js:179
            hiddenRowPreWork(defaultRow)

        }, { once: true })
    })
}
// END !SECTION On Edit Button Event

// SECTION On Remove Button Event
function removeLogButtonEvent(removeLogButton, defaultRow) {
    removeLogButton.addEventListener('click', () => {
        defaultRow.nextElementSibling.remove()
        defaultRow.remove();
    })
}
// END !SECTION On Remove Button Event

// Function SECTION Create's Detailed Row
function createDetailRow(defaultRow, dataObject, logTypeImage) {

    const detailRow = document.createElement('tr')
    detailRow.className = 'revealOnClick'

    const detailRowData = document.createElement('td')
    detailRowData.setAttribute('colspan', '5')

    const detailRowDiv = document.createElement('div')
    detailRowDiv.className = 'hiddenRow'

    // ANCHOR Add DataList 
    // for each Hidden Detailed Lists
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
    editLogButtonEvent(editLogButton, defaultRow, dataObject, logTypeImage);
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
}
// END Function !SECTION Create's Detailed Row

// SECTION Pre-Work to Facilitate to Hidden Row Creation
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
                "In Progress": "12%",
                "Log Description": entryLog
            }, logTypeImage
        );

        // Indicate Open State on Arrow
        defaultRow.lastElementChild.children[0].checked = true;

    } else {
        // Set to Default if Hidden Row not Revealed
        setDefault(defaultRow)
    }
}

// Set to Default Values
function setDefault(row) {
    row.classList.remove('rowRevealed');
    row.children[0].setAttribute('rowspan', '1')

    // Click Default Row removes Hidden Row
    if (row.nextElementSibling != undefined && row.nextElementSibling.className == 'revealOnClick') {
        row.nextElementSibling.remove();
    }

    row.lastElementChild.children[0].checked = false
}

// Click event for each TableRow
tableRows.forEach(row => row.addEventListener('click', (e) => {
    e.currentTarget.classList.add('rowRevealed')

    for (let rowPresent of tableRows) {
        // console.log(rowDefault)

        // For Other row's on Not Click
        if (rowPresent !== e.currentTarget) {
            setDefault(rowPresent)
        }
    }

    // Start PreWork for Hidden Row
    hiddenRowPreWork(e.currentTarget);
}));

// END !SECTION Display Detailed Row


// SECTION Imitate Dropdown for div element created
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

// END !SECTION Imitate Dropdown