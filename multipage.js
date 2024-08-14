// src/MultiPageForm.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

const MultiPageForm = () => {
  const [page, setPage] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    Sports: [],
    Traveling: [],
    'Sports and Traveling': []
  });
  const [visitedBlog, setVisitedBlog] = useState('');
  const [blogReason, setBlogReason] = useState('');

  const handleInterestChange = (event) => {
    setSelectedInterest(event.target.value);
    setSelectedOptions((prev) => ({ ...prev, [event.target.value]: [] }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prev) => {
      const updatedOptions = prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value];
      return { ...prev, [name]: updatedOptions };
    });
  };

  const handleVisitedBlogChange = (event) => {
    setVisitedBlog(event.target.value);
  };

  const handleBlogReasonChange = (event) => {
    setBlogReason(event.target.value);
  };

  const handleNextPage = () => {
    // Validation logic for page 2 where checkboxes are present
    if (page === 2) {
      if (selectedInterest === 'Sports' && selectedOptions.Sports.length < 2) {
        alert('Please select at least 2 sports options.');
        return;
      } else if (selectedInterest === 'Traveling' && selectedOptions.Traveling.length < 2) {
        alert('Please select at least 2 traveling options.');
        return;
      } else if (selectedInterest === 'Sports and Traveling') {
        const totalSelected = selectedOptions.Sports.length + selectedOptions.Traveling.length;
        if (totalSelected < 2) {
          alert('Please select at least 2 options.');
          return;
        }
      }
    }

    // Proceed to the next page
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Interest:', selectedInterest);
    console.log('Selected Options:', selectedOptions[selectedInterest]);
    console.log('Have you ever visited the blog:', visitedBlog);
    console.log('Why you visit the Blog:', blogReason);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="multi-page-form">
        {page === 1 && (
          <div className="page-content">
            <h2>Select Your Interest</h2>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="interest"
                  value="Sports"
                  checked={selectedInterest === 'Sports'}
                  onChange={handleInterestChange}
                />
                Sports
              </label>
              <label>
                <input
                  type="radio"
                  name="interest"
                  value="Traveling"
                  checked={selectedInterest === 'Traveling'}
                  onChange={handleInterestChange}
                />
                Traveling
              </label>
              <label>
                <input
                  type="radio"
                  name="interest"
                  value="Sports and Traveling"
                  checked={selectedInterest === 'Sports and Traveling'}
                  onChange={handleInterestChange}
                />
                Sports and Traveling
              </label>
            </div>
            <button type="button" className="next-button" onClick={handleNextPage} disabled={!selectedInterest}>
              Next
            </button>
          </div>
        )}

        {page === 2 && (
          <div className="page-content">
            <h3>{selectedInterest} Interests</h3>
            <div className="checkbox-grid">
              {(selectedInterest === 'Sports' || selectedInterest === 'Sports and Traveling') && (
                <>
                  {['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer', 'Volleyball', 'Cricket', 'Rugby'].map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        name="Sports"
                        value={option}
                        checked={selectedOptions.Sports.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      {option}
                    </label>
                  ))}
                </>
              )}
              {(selectedInterest === 'Traveling' || selectedInterest === 'Sports and Traveling') && (
                <>
                  {['Beach', 'Mountains', 'City', 'Countryside', 'Desert', 'Forest', 'Island', 'River'].map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        name="Traveling"
                        value={option}
                        checked={selectedOptions.Traveling.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      {option}
                    </label>
                  ))}
                </>
              )}
            </div>
            <button type="button" className="prev-button" onClick={handlePreviousPage}>
              Previous
            </button>
            <button type="button" className="next-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}

        {page === 3 && (
          <div className="page-content">
            <h3>Have you ever visited a blog?</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="visitedBlog"
                  value="Yes"
                  checked={visitedBlog === 'Yes'}
                  onChange={handleVisitedBlogChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="visitedBlog"
                  value="No"
                  checked={visitedBlog === 'No'}
                  onChange={handleVisitedBlogChange}
                />
                No
              </label>
            </div>
            <button type="button" className="prev-button" onClick={handlePreviousPage}>
              Previous
            </button>
            <button type="button" className="next-button" onClick={handleNextPage} disabled={!visitedBlog}>
              Next
            </button>
          </div>
        )}

        {page === 4 && (
          <div className="page-content">
            <div className="text-box-group">
              <label htmlFor="blogReason">Why do you visit the Blog?</label>
              <textarea
                id="blogReason"
                value={blogReason}
                onChange={handleBlogReasonChange}
                className="text-box"
                placeholder="Enter your reason here..."
              />
            </div>
            <button type="button" className="prev-button" onClick={handlePreviousPage}>
              Previous
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiPageForm;
