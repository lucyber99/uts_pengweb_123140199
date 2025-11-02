import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dog');
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [images, setImages] = useState([]);
  const [facts, setFacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [factsLoading, setFactsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('animalFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animalFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch breeds when tab changes
  useEffect(() => {
    fetchBreeds();
    setSelectedBreed('');
    setImages([]);
    setFacts([]);
  }, [activeTab]);

  const fetchBreeds = async () => {
    try {
      if (activeTab === 'dog') {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } else {
        // Cat API doesn't have breeds list, so we'll use common cat breeds
        const catBreeds = [
          'abyssinian', 'bengal', 'birman', 'bombay', 'british shorthair',
          'burmese', 'maine coon', 'persian', 'ragdoll', 'siamese', 'sphynx'
        ];
        setBreeds(catBreeds);
      }
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchImages = async () => {
    if (!selectedBreed) return;
    
    setLoading(true);
    try {
      if (activeTab === 'dog') {
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/12`);
        const data = await response.json();
        setImages(data.message);
      } else {
        // For cats, we'll use a placeholder service since Cat Facts API doesn't provide images
        // Using a cat image API
        const catImages = [];
        for (let i = 0; i < 12; i++) {
          catImages.push(`https://cataas.com/cat?${Date.now()}-${i}`);
        }
        setImages(catImages);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacts = async () => {
    setFactsLoading(true);
    try {
      const newFacts = [];
      
      if (activeTab === 'dog') {
        // Dog CEO API doesn't have facts, so we'll use predefined dog facts
        const dogFacts = [
          "Dogs have a sense of time and can predict future events, such as regular walk times.",
          "A dog's nose print is unique, much like a person's fingerprint.",
          "Dogs can understand up to 250 words and gestures.",
          "The Basenji is the only dog breed that doesn't bark.",
          "Dogs have three eyelids, including one to keep their eyes moist and protected.",
          "A dog's sense of smell is 10,000 to 100,000 times more acute than humans.",
          "Puppies are born deaf, blind, and toothless.",
          "The tallest dog in the world is 44 inches tall.",
          "Dogs can be trained to detect cancer and other diseases in humans.",
          "A dog's whiskers help them 'see' in the dark."
        ];
        // Randomly select 5 facts
        const shuffled = dogFacts.sort(() => 0.5 - Math.random());
        newFacts.push(...shuffled.slice(0, 5));
      } else {
        // Fetch cat facts from Cat Facts API
        for (let i = 0; i < 5; i++) {
          const response = await fetch('https://catfact.ninja/fact');
          const data = await response.json();
          newFacts.push(data.fact);
        }
      }
      
      setFacts(newFacts);
    } catch (error) {
      console.error('Error fetching facts:', error);
    } finally {
      setFactsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  const handleSearch = () => {
    fetchImages();
  };

  const handleRefreshFacts = () => {
    fetchFacts();
  };

  const toggleFavorite = (imageUrl) => {
    setFavorites((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const isFavorite = (imageUrl) => {
    return favorites.includes(imageUrl);
  };

  // Load initial facts
  useEffect(() => {
    fetchFacts();
  }, [activeTab]);

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="main-content">
        <SearchForm
          breeds={breeds}
          selectedBreed={selectedBreed}
          onBreedChange={handleBreedChange}
          onSearch={handleSearch}
          animalType={activeTab}
        />

        {loading ? (
          <div className="loading">Loading images...</div>
        ) : images.length > 0 ? (
          <>
            <section className="gallery-section">
              <h2>Gallery</h2>
              <div className="gallery-grid">
                {images.map((imageUrl, index) => (
                  <DetailCard
                    key={index}
                    imageUrl={imageUrl}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite(imageUrl)}
                  />
                ))}
              </div>
            </section>

            {favorites.length > 0 && (
              <section className="favorites-section">
                <h2>❤️ Favorite Images ({favorites.length})</h2>
                <div className="gallery-grid">
                  {favorites.map((imageUrl, index) => (
                    <DetailCard
                      key={index}
                      imageUrl={imageUrl}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>Select a breed and click "Load Images" to see the gallery!</p>
          </div>
        )}

        <DataTable
          facts={facts}
          onRefresh={handleRefreshFacts}
          loading={factsLoading}
          animalType={activeTab}
        />
      </main>

      <footer className="footer">
        <p>Made with ❤️ using Dog CEO API & Cat Facts API</p>
      </footer>
    </div>
  );
}

export default App;
