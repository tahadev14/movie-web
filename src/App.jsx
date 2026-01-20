import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
// const API_OPTIONS = {
//   method: 'get',
//   headers: {
//     accept: 'application/.json',
//     Authorization: `Bearer${API_KEY}`
//   }
// }
const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessege, seterrorMessege] = useState('');
  const [movieslist,setMovieslist] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async () => {
    setisLoading(true)
    seterrorMessege('')
    try {
      const endpoint = `${API_BASE_URL}?s=batman&apikey=${API_KEY}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Error failed to fectch movies ");
      }
      const data = await response.json();
      if(data.Response==='False'){
        seterrorMessege(data.Error||'Faield Error messege')
        setMovieslist([])
        return;
      }

      setMovieslist(data.results||[])

    } catch (error) {
      console.log(`error fatching;movies`)
      seterrorMessege(`error factching moves . plz try agin later`)
    } finally{
      setisLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])


  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="" />
          <h1>Find <span className='text-gradient'>Move</span> You ill Enjoy without the Hassel</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
          <h1>{searchTerm}</h1>
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>

           {errorMessege && <p className='text-red-500'>{errorMessege}</p>}
          {isLoading ?( 
            <p className='text-white'>loading...</p>
          ):errorMessege?(
            <p className='text-red-500'>{errorMessege}</p>
          ):(
            <ul>{movieslist.map((movie)=>(
              <p className='text-white'>{movie.title}</p>
            ))
            }</ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

// trying code is here use Ai it will work above the code i was working sir

// import React, { useEffect, useState } from 'react'
// import Search from './components/Search.jsx'

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);
//   const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

//   // Function to fetch movies based on searchTerm
//   const fetchMovies = async (query) => {
//     if (!query) return; // agar searchTerm empty ho to fetch na kare
//     try {
//       const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
//       const data = await res.json();
//       if (data.Response === "True") {
//         setMovies(data.Search);
//       } else {
//         setMovies([]);
//       }
//     } catch (err) {
//       console.error("Error fetching movies:", err);
//     }
//   }

//   // useEffect to watch searchTerm
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchMovies(searchTerm);
//     }, 500); // 500ms delay for better UX

//     return () => clearTimeout(delayDebounce); // cleanup
//   }, [searchTerm]);

//   return (
//     <main>
//       <div className='pattern'/>
//       <div className='wrapper'>
//         <header>
//           <img src="./hero-img.png" alt="" />
//           <h1>Find <span className='text-gradient'>Movies</span> You Will Enjoy without the Hassle</h1>
//         </header>
//       </div>

//       <Search searchTerm={searchTerm} setsearchTerm={setSearchTerm} />

//       <div className='movies-container'>
//         {movies.length > 0 ? (
//           movies.map(movie => (
//             <div key={movie.imdbID} className='movie-card'>
//               <img src={movie.Poster} alt={movie.Title} />
//               <h3>{movie.Title}</h3>
//               <p>{movie.Year}</p>
//             </div>
//           ))
//         ) : (
//           searchTerm && <p className='text-white'>No movies found.</p>
//         )}
//       </div>
//     </main>
//   )
// }

// export default App
