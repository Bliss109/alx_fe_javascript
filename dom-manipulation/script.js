// script.js
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Sample quotes
const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
  {text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration"},
  { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Inspiration' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.author}`;
}

newQuoteButton.addEventListener('click', showRandomQuote);
const newQuoteForm = document.createElement('form');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

newQuoteForm.innerHTML = `
  <input type="text" id="newQuoteText" placeholder="Enter a new quote">
  <input type="text" id="newQuoteCategory" placeholder="Enter quote category">
  <button type="submit">Add Quote</button>
`;

document.body.appendChild(newQuoteForm);

function addQuote(event) {
  event.preventDefault();
  const newQuote = {
    text: newQuoteText.value,
    category: newQuoteCategory.value,
  };
  quotes.push(newQuote);
  showRandomQuote(); // Display the newly added quote
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

newQuoteForm.addEventListener('submit', addQuote);
  