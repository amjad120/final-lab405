import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = 'http://localhost:3000/api';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [newURL, setNewURL] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAllBookmarks = async () => {
      try {
        const response = await fetch(`${apiUrl}/readAll.php`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched bookmarks:', data);  // Log the response data
        if (data.message) {
          setErrorMessage(data.message);
          setBookmarks([]);
        } else {
          setBookmarks(data);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error.message);
        setErrorMessage('Failed to load bookmarks');
      }
    };
  
    fetchAllBookmarks();
  }, []);
  

  const addNewBookmark = async () => {
    if (!newURL.trim() || !newTitle.trim()) return;
  
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ URL: newURL.trim(), title: newTitle.trim() }),
      };
  
      const response = await fetch(`${apiUrl}/create.php`, options);
      if (!response.ok) {
        throw new Error('Failed to add new bookmark');
      }
  
      setNewURL('');
      setNewTitle('');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to add new bookmark');
    }
  };

  const deleteBookmark = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      };
  
      const response = await fetch(`${apiUrl}/delete.php`, options);
      if (!response.ok) {
        throw new Error('Failed to delete bookmark');
      }
  
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to delete bookmark');
    }
  };
// Update a bookmark
const updateBookmark = async (id, updatedURL, updatedTitle) => {
  try {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, URL: updatedURL, title: updatedTitle }),
    };

    const response = await fetch(`${apiUrl}/update.php`, options);
    if (!response.ok) {
      throw new Error('Failed to update bookmark');
    }

    window.location.reload();
  } catch (error) {
    console.error(error.message);
    setErrorMessage('Failed to update bookmark');
  }
};

// Add update button and inputs for each bookmark
<ul>
  {bookmarks.map((bookmark) => (
    <li key={bookmark.id}>
      <a href={bookmark.URL} target="_blank" rel="noopener noreferrer">
        {bookmark.title}
      </a>
      <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
      <input
        type="text"
        placeholder="New URL"
        onChange={(e) => setNewURL(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={() => updateBookmark(bookmark.id, newURL, newTitle)}>
        Update
      </button>
    </li>
  ))}
</ul>;



  return (
    <div id="content">
      <div>
        <input
          type="text"
          placeholder="URL"
          value={newURL}
          onChange={(e) => setNewURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addNewBookmark}>Add Bookmark</button>
      </div>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <ul>
      {bookmarks.map((bookmark) => (
  <li key={bookmark.id}>
    <a href={bookmark.URL} target="_blank" rel="noopener noreferrer">
      {bookmark.title}
    </a>
    <button className='btn1' onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
    <button className='btn1'
      onClick={() => {
        const updatedURL = prompt('Enter new URL:', bookmark.URL);
        const updatedTitle = prompt('Enter new title:', bookmark.title);
        if (updatedURL && updatedTitle) {
          updateBookmark(bookmark.id, updatedURL, updatedTitle);
        }
      }}
    >
      Update
    </button>
  </li>
))}
      </ul>
    </div>
  );
}

export default App;
