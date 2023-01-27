// UI variables
const addBookBtn = document.querySelector('.add-book');
const addBookSection = document.querySelector('.books-form');
const addBookForm = document.querySelector('.books-form form');
const closeBtn = document.querySelector('.close-button');
const statusSpan = document.querySelector('.book-from-status-span');
const titleUI = document.getElementById('title');
const authorUI = document.getElementById('author');
const pagesUI = document.getElementById('pages');
const statusUI = document.getElementById('status');

// Functions
function showForm() {
  addBookSection.style.display = 'block';
}

function hideForm() {
  addBookSection.style.display = 'none';
}

function toggleCheck() {
  if (this.checked) {
    statusSpan.textContent = 'Read';
  } else {
    statusSpan.textContent = 'Not Read';
  }
}

// Event listeners
addBookBtn.addEventListener('click', showForm);
closeBtn.addEventListener('click', hideForm);
statusUI.addEventListener('click', toggleCheck);
addBookForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addBookToLibrary();
  hideForm();
});

// Library
const myLibrary = [];

// Function constructor for Book
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.read = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary() {
  const book = new Book(
    titleUI.textContent,
    authorUI.textContent,
    pagesUI.textContent,
    statusUI.checked
  );
  myLibrary.push(book);
  console.log(myLibrary);
}
