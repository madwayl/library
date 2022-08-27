// Constructor

function Book(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = function () {
        if (haveRead) return 'read'
        else return 'not read yet'
    }
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead()}`
    }

}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false)

console.log(theHobbit.info())
console.log(theHobbit.haveRead())

let hamster = {
    stomach: [],
    eat(food) {
        // assign to this.stomach instead of this.stomach.push
        this.stomach = this.stomach.concat(food)
    }
};