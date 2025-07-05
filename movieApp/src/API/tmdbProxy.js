// src/api/tmdbProxy.js
export const fetchFromTMDB = async (endpoint, query = '') => {
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  
  if (query) {
    url.searchParams.set('query', query);
  } else {
    url.searchParams.set('sort_by', 'popularity.desc');
  }

  const response = await fetch(url.toString(), {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  });

  if (!response.ok) throw new Error('TMDB API request failed');
  return await response.json();
};