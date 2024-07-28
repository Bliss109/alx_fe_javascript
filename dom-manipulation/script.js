document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categorySelect = document.createElement('select');
  
    categorySelect.id = 'categorySelect';
    categorySelect.innerHTML = `
      <option value="all">All Categories</option>
    `;
    document.body.insertBefore(categorySelect, quoteDisplay);
  
    // Sample quotes
    const quotes = [
      { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
      { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt', category: 'Inspiration' },
      { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Inspiration' },
      // Add more quotes as needed
    ];
  
    // Populate category select options
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  
    function showRandomQuote() {
      const selectedCategory = categorySelect.value;
      const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
      
      if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = 'No quotes available for the selected category.';
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.author ? randomQuote.author : 'Unknown'}`;
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
  
    const newQuoteForm = document.createElement('form');
    newQuoteForm.innerHTML = `
      <input type="text" id="newQuoteText" placeholder="Enter a new quote" required>
      <input type="text" id="newQuoteAuthor" placeholder="Enter author name (optional)">
      <input type="text" id="newQuoteCategory" placeholder="Enter quote category" required>
      <button type="submit">Add Quote</button>
    `;
    document.body.appendChild(newQuoteForm);
  
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
  
      // Update category select options if the new category is unique
      if (!categories.includes(newQuoteCategory)) {
        categories.push(newQuoteCategory);
        const option = document.createElement('option');
        option.value = newQuoteCategory;
        option.textContent = newQuoteCategory;
        categorySelect.appendChild(option);
      }
  
      showRandomQuote(); // Display the newly added quote
      newQuoteForm.reset();
    }
  
    newQuoteForm.addEventListener('submit', addQuote);
  });