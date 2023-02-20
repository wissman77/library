// Library
const myLibrary = [];

// // Function constructor for Book
// function Book(title, author, pages, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
// }

// Book.prototype.read = function () {
//   this.isRead = !this.isRead;
// };

// using new class feature
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  read() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary() {
  const book = new Book(
    titleUI.value,
    authorUI.value,
    pagesUI.value,
    statusUI.checked
  );
  myLibrary.push(book);
}

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

// iterate over books objects array and produce UI cards
function displayBooks() {
  booksContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    booksContainer.appendChild(addBookToUI(book, index));
  });
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
  removeBtn.setAttribute('data-id', index);
  div.appendChild(removeBtn);

  return div;
}

// deletes the book from myLibrary and the card from UI
function deleteBook(e) {
  if (e.target.className === 'remove') {
    const index = +e.target.getAttribute('data-id');
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// marks a book in myLibrary as read and Updated the UI
function markBookAsRead(e) {
  if (e.target.tagName === 'INPUT' && e.target.getAttribute('data-id')) {
    const index = +e.target.getAttribute('data-id');
    const spanToEdit = document.querySelector(`span[data-id="${index}"`);
    spanToEdit.textContent = e.target.checked ? 'Read' : 'Not Read';
    const myBook = myLibrary[index];
    myBook.read();
  }
}

// Event listeners
addBookBtn.addEventListener('click', showForm);
closeBtn.addEventListener('click', hideForm);
statusUI.addEventListener('click', toggleCheck);
addBookForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  hideForm();
});
booksContainer.addEventListener('click', deleteBook);
booksContainer.addEventListener('click', markBookAsRead);

// Form validity checks
titleUI.addEventListener('invalid', () => {
  if (titleUI.validity.valueMissing) {
    titleUI.setCustomValidity('You must fill the Title field for the book');
  } else {
    titleUI.setCustomValidity('');
  }
});

authorUI.addEventListener('invalid', () => {
  if (authorUI.validity.valueMissing) {
    authorUI.setCustomValidity('You must fill the Author field for the book');
  } else {
    authorUI.setCustomValidity('');
  }
});

pagesUI.addEventListener('invalid', () => {
  if (pagesUI.validity.valueMissing) {
    pagesUI.setCustomValidity(
      `Please enter number of pages between ${pagesUI.min}-${pagesUI.max}`
    );
  } else if (pagesUI.validity.rangeUnderflow) {
    pagesUI.setCustomValidity(
      `Please enter number of pages equal or more than ${pagesUI.min}`
    );
  } else if (pagesUI.validity.rangeOverflow) {
    pagesUI.setCustomValidity(
      `Please enter number of pages equal or less than ${pagesUI.max}`
    );
  } else {
    pagesUI.setCustomValidity('');
  }
});
