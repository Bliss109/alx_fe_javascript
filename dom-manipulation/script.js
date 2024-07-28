const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Sample quotes
const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
  { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Inspiration' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `${randomQuote.text}   
 - ${randomQuote.author}`;
}

newQuoteButton.addEventListener('click', showRandomQuote);

// Create a function to create the add quote form
function createAddQuoteForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" id="newQuoteText" placeholder="Enter a new quote">
    <input type="text" id="newQuoteCategory" placeholder="Enter quote category">
    <button type="submit">Add Quote</button>
  `;
  document.body.appendChild(form);
  form.addEventListener('submit', addQuote);
}

// Call the function to create the form
createAddQuoteForm();

function addQuote(event) {
  event.preventDefault();
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const newQuote = {
    text: newQuoteText.value,
    category: newQuoteCategory.value,
  };
  quotes.push(newQuote);
  showRandomQuote(); // Display the newly added quote
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}
const categoryFilter = document.getElementById('categoryFilter');

function getUniqueCategories() {
  const categories = new Set();
  quotes.forEach(quote => categories.add(quote.category));
  return Array.from(categories);
}

function populateCategoryFilter() {
  const uniqueCategories = getUniqueCategories();
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text   
 = category;
    categoryFilter.appendChild(option);
  });
}

function   
 filterQuotes() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  // Update quoteDisplay with filteredQuotes
}

// Call functions to populate category filter and show initial quotes
populateCategoryFilter();
showRandomQuote();
// ... previous code

function addQuote(event) {
    // ... previous code
  
    // Update category filter if new category is added
    populateCategoryFilter();
  
    // ... rest of the code
  }
  
  // Function to save last selected filter to local storage
  function saveLastFilter(category) {
    localStorage.setItem('lastFilter', category);
  }
  
  // Function to restore last selected filter from local storage
  function restoreLastFilter() {
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
      categoryFilter.value = lastFilter;
      filterQuotes();
    }
  }
  
  // Call restoreLastFilter on page load
  restoreLastFilter();
  