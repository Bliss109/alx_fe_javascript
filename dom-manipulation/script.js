document.addEventListener('DOMContentLoaded', async function () {
  const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { id: 1, text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Inspiration' },
    { id: 2, text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt', category: 'Inspiration' },
    { id: 3, text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'Inspiration' },
    // Add more quotes as needed
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const categoryFilter = document.getElementById('categoryFilter');
  const notification = document.getElementById('notification');

  function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(function (category) {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }

  function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(function (quote) {
      return quote.category === selectedCategory;
    });

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

  async function addQuote(event) {
    event.preventDefault();
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteAuthor = document.getElementById('newQuoteAuthor').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    const newQuote = {
      id: Date.now(), // Simulate unique ID
      text: newQuoteText,
      author: newQuoteAuthor,
      category: newQuoteCategory,
    };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));

    if (![...categoryFilter.options].some(function (option) {
      return option.value === newQuoteCategory;
    })) {
      const option = document.createElement('option');
      option.value = newQuoteCategory;
      option.textContent = newQuoteCategory;
      categoryFilter.appendChild(option);
    }

    showRandomQuote();
    newQuoteForm.reset();
    await syncWithServer(newQuote);
  }

  newQuoteForm.addEventListener('submit', addQuote);

  async function syncWithServer(newQuote) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newQuote),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      console.log('Quote synced with server:', data);
      notifyUser('Quote synced with server');
    } catch (error) {
      console.error('Error syncing with server:', error);
      notifyUser('Error syncing with server');
    }
  }

  async function fetchQuotesFromServer() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const serverQuotes = data.map(function (item) {
        return {
          id: item.id,
          text: item.title,
          author: item.body,
          category: 'Server',
        };
      });
      resolveConflicts(serverQuotes);
    } catch (error) {
      console.error('Error fetching from server:', error);
      notifyUser('Error fetching from server');
    }
  }

  function resolveConflicts(serverQuotes) {
    const localQuotes = quotes.slice();
    const allQuotes = localQuotes.concat(serverQuotes);
    const uniqueQuotes = allQuotes.reduce(function (acc, quote) {
      if (!acc.find(function (q) {
        return q.id === quote.id;
      })) {
        acc.push(quote);
      }
      return acc;
    }, []);

    quotes.length = 0;
    uniqueQuotes.forEach(function (quote) {
      quotes.push(quote);
    });
    localStorage.setItem('quotes', JSON.stringify(quotes));

    populateCategories();
    showRandomQuote();
    notifyUser('Quotes have been updated from the server.');
  }

  function notifyUser(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(function () {
      notification.style.display = 'none';
    }, 5000);
  }

  async function syncQuotes() {
    await fetchQuotesFromServer();
  }

  populateCategories();
  showRandomQuote();
  setInterval(syncQuotes, 60000); // Sync every 60 seconds
});
