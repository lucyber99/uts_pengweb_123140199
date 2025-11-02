import React from 'react';

const SearchForm = ({ breeds, selectedBreed, onBreedChange, onSearch, animalType }) => {
  return (
    <div className="search-form">
      <div className="form-group">
        <label htmlFor="breed-select">
          Select {animalType === 'dog' ? 'Dog' : 'Cat'} Breed:
        </label>
        <div className="form-controls">
          <select
            id="breed-select"
            value={selectedBreed}
            onChange={(e) => onBreedChange(e.target.value)}
            className="breed-select"
          >
            <option value="">-- Select a breed --</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={onSearch}
            disabled={!selectedBreed}
            className="search-button"
          >
            Load Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
