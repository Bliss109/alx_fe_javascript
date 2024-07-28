document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "In the middle of every difficulty lies opportunity.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" }
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
  
    newQuoteButton.addEventListener('click', displayRandomQuote);
  
    function displayRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
    }
  
    window.addQuote = function() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('New quote added successfully!');
      } else {
        alert('Please enter both quote text and category.');
      }
    }
  });
  