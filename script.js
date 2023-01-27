// UI variables
const addBookBtn = document.querySelector('.add-book');
const addBookSection = document.querySelector('.books-form');
const addBookForm = document.querySelector('.books-form form');
const closeBtn = document.querySelector('.close-button');
const booksContainer = document.querySelector('.books-container');
const statusSpan = document.querySelector('.book-from-status-span');
const titleUI = document.getElementById('title');
const authorUI = document.getElementById('author');
const pagesUI = document.getElementById('pages');
const statusUI = document.getElementById('status');

// Functions
function showForm() {
  titleUI.value = '';
  authorUI.value = '';
  pagesUI.value = '';
  statusUI.checked = false;
  statusSpan.textContent = 'Not Read';
  addBookSection.style.display = 'block';
}

function hideForm() {
  addBookSection.style.display = 'none';
}

// Toggle the span text when the checkbox state change
function toggleCheck() {
  statusSpan.textContent = this.checked ? 'Read' : 'Not Read';
}

function displayBooks() {
  if (myLibrary.length) {
    booksContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
      booksContainer.appendChild(addBookToUI(book, index));
    });
  }
}

// Get a book object and its index in the array and build a UI component
// for a book card
function addBookToUI(book, index) {
  const div = document.createElement('div');
  div.classList.add('book');
  const title = document.createElement('h2');
  title.textContent = book.title;
  div.appendChild(title);
  const author = document.createElement('p');
  author.textContent = `by ${book.author}`;
  div.appendChild(author);
  const pages = document.createElement('p');
  pages.textContent = `${book.pages} pages`;
  div.appendChild(pages);
  const isReadDiv = document.createElement('div');

  const isRead = document.createElement('input');
  isRead.setAttribute('type', 'checkbox');
  isRead.setAttribute('data-id', index);
  isRead.checked = book.isRead;
  // Event Listener to change the UI status for read property
  isRead.addEventListener('click', function () {
    const spanToEdit = document.querySelector(`span[data-id="${index}"`);
    spanToEdit.textContent = this.checked ? 'Read' : 'Not Read';
    const myBook = myLibrary[index];
    myBook.read();
  });
  isReadDiv.appendChild(isRead);

  const isReadSpan = document.createElement('span');
  isRead.setAttribute('data-id', index);
  isReadSpan.textContent = book.isRead ? 'Read' : 'Not Read';
  isReadSpan.setAttribute('data-id', index);

  isReadDiv.appendChild(isReadSpan);
  div.appendChild(isReadDiv);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete Book';
  removeBtn.classList.add('remove');
  // add event listener to remove the book
  removeBtn.addEventListener('click', function () {
    delete myLibrary[index];
    displayBooks();
  });
  div.appendChild(removeBtn);

  return div;
}

// Event listeners
addBookBtn.addEventListener('click', showForm);
closeBtn.addEventListener('click', hideForm);
statusUI.addEventListener('click', toggleCheck);
addBookForm.addEventListener('submit', function (e) {
  addBookToLibrary();
  displayBooks();
  hideForm();
  e.preventDefault();
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
    titleUI.value,
    authorUI.value,
    pagesUI.value,
    statusUI.checked
  );
  myLibrary.push(book);
}
