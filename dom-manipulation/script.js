document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
      { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
      { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt', category: 'Inspiration' },
      { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Inspiration' },
      // Add more quotes as needed
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Populate category filter options
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
    }
  
    function showRandomQuote() {
      const selectedCategory = categoryFilter.value;
      const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
      if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = 'No quotes available for the selected category.';
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.author ? randomQuote.author : 'Unknown'}`;
    }
  
    function filterQuotes() {
      localStorage.setItem('selectedCategory', categoryFilter.value);
      showRandomQuote();
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', filterQuotes);
  
    const newQuoteForm = document.querySelector('.form-section');
    newQuoteForm.innerHTML += `
      <input type="text" id="newQuoteText" placeholder="Enter a new quote" required>
      <input type="text" id="newQuoteAuthor" placeholder="Enter author name (optional)">
      <input type="text" id="newQuoteCategory" placeholder="Enter quote category" required>
      <button type="submit">Add Quote</button>
    `;
  
    function addQuote(event) {
      event.preventDefault();
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteAuthor = document.getElementById('newQuoteAuthor').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
      const newQuote = {
        text: newQuoteText,
        author: newQuoteAuthor,
        category: newQuoteCategory,
      };
      quotes.push(newQuote);
  
      if (!categories.includes(newQuoteCategory)) {
        categories.push(newQuoteCategory);
        const option = document.createElement('option');
        option.value = newQuoteCategory;
        option.textContent = newQuoteCategory;
        categoryFilter.appendChild(option);
      }
  
      showRandomQuote(); // Display the newly added quote
      newQuoteForm.reset();
    }
  
    newQuoteForm.addEventListener('submit', addQuote);
  
    // Display a random quote on page load
    showRandomQuote();
  });
  