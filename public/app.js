const API = '/api/books';

const form = document.getElementById('bookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const list = document.getElementById('booksList');
const count = document.getElementById('count');

let editId = null;

// Fetch and render all books
async function loadBooks() {
  const res = await fetch(API);
  const books = await res.json();

  count.textContent = `${books.length} ${books.length === 1 ? 'book' : 'books'}`;
  list.innerHTML = books.map(b => `
    <li class="book-item" data-id="${b.id}">
      <div class="book-details">
        <div class="book-title">${escape(b.title)}</div>
        <div class="book-author">${escape(b.author)}</div>
      </div>
      <div class="book-actions">
        <button onclick="editBook(${b.id}, '${escapeAttr(b.title)}', '${escapeAttr(b.author)}')">edit</button>
        <button class="del" onclick="deleteBook(${b.id})">delete</button>
      </div>
    </li>
  `).join('');
}

// Add or edit book
form.onsubmit = async (e) => {
  e.preventDefault();
  const payload = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim()
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    resetForm();
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    form.reset();
  }

  loadBooks();
};

window.editBook = (id, title, author) => {
  editId = id;
  titleInput.value = title;
  authorInput.value = author;
  submitBtn.textContent = 'Save';
  cancelBtn.hidden = false;
  titleInput.focus();
};

function resetForm() {
  editId = null;
  form.reset();
  submitBtn.textContent = 'Add';
  cancelBtn.hidden = true;
}

cancelBtn.onclick = resetForm;

window.deleteBook = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (editId === id) resetForm();
  loadBooks();
};

function escape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

loadBooks();
