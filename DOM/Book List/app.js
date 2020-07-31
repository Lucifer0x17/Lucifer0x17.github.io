class Book{
    constructor(title , author , isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}

class UI{
    createBook(book){
        const bookList = document.querySelector("#book-list");
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td><a href = "#" class = "target">X</a></td>`;
        bookList.appendChild(tr);
    }
    showAlert(message , className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById("book-form");
        container.insertBefore(div , form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        } , 3000);
    }
    clearList(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    deleteBook(target){
        if(target.className === 'target')
        {
           if(confirm('Are you sure?'))
           {
                target.parentElement.parentElement.remove();
                this.showAlert("Book Removed", "success");
           }
        }
    }
}

class Local{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Local.getBook();
        books.forEach(function(book){
            const ui = new UI();
            ui.createBook(book);
        });
    }
    static storeBook(book){
        const books = Local.getBook();
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Local.getBook();
        books.forEach(function(book , index){
            if(book.isbn === isbn)
            {
                books.splice(index , 1);
            }
        });
        localStorage.setItem('books' , JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded' , Local.displayBooks);
document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
    const book = new Book(title, author, isbn);
    const ui = new UI();
    if(title === '' || author === '' || isbn === '')
    {
        ui.showAlert('Enter the values' , 'error');
    }
    else
    {
        ui.createBook(book);
        ui.showAlert("Book Added", "success");
        Local.storeBook(book);
        ui.clearList();
    }
 });

 document.querySelector("#book-list").addEventListener('click' , function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    Local.removeBook(e.target.parentElement.previousElementSibling.textContent);
 });