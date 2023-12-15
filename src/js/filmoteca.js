// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// Щоб отримати постер фільму потрібно підставити url
// з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"
// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

// *********************** Кнопка "Load More" ************************** \\

// const container = document.querySelector('.js-movie-list');
// const loadMore = document.querySelector('.js-load-more');
// let page = 1;
// //  499 or 999

// loadMore.addEventListener('click', onLoadMore);

// serviceMovie()
//   .then(data => {
//     // console.log(data.page);
//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));

//     if (data.page < data.total_pages) {
//       // data.page < 500
//       loadMore.classList.replace('load-more-hidden', 'load-more');
//     }
//   })
//   .catch(error => console.log('Error', error));

//            тут за замовчуванням page = 1;
// function serviceMovie(page = 1) {
//   const BASE_URL = 'https://api.themoviedb.org/3';
//   const END_POINT = '/trending/movie/week';
//   const API_KEY = '345007f9ab440e5b86cef51be6397df1';

//   const queryParams = new URLSearchParams({
//     api_key: API_KEY,
//     page: page,
//   });

//   return fetch(`${BASE_URL}${END_POINT}?${queryParams}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, release_date, original_title, vote_average }) => `
//     <li class="movie-card">
//     <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//     <div class="movie-info">
//      <h2>${original_title}</h2>
//      <p>Release date: ${release_date}</p>
//      <p>Vote average: ${vote_average}</p>
//      </div>
//      </li>`
//     )
//     .join('');
// }

// function onLoadMore() {
//   page += 1;
//   serviceMovie(page).then(data => {
//     // console.log(data.total_pages);
//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));

//     if (data.page >= data.total_pages) {
//       // data.page >= 500
//       loadMore.classList.replace('load-more', 'load-more-hidden');
//     }
//   });
// }
// -------------------------------------------------------------
//                      те саме тільки через  axios

// function serviceMovie(page = 1) {
//   const BASE_URL = 'https://api.themoviedb.org/3';
//   const END_POINT = '/trending/movie/week';
//   const API_KEY = '345007f9ab440e5b86cef51be6397df1';

//   const queryParams = new URLSearchParams({
//     api_key: API_KEY,
//     page: page,
//   });
//   return axios
//     .get(`${BASE_URL}${END_POINT}?${queryParams}`)
//     .then(resp => {
//       console.log(resp);
//       return resp.data;
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
// }

// ------------------------------------------------------------
//  те саме тільки через async await

// async function render() {
//   try {
// const data = await serviceMovie();

//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));
//     if (data.page < data.total_pages) {
//       // data.page < 500
//       loadMore.classList.replace('load-more-hidden', 'load-more');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// render();

// async function serviceMovie(page = 1) {
//   const BASE_URL = 'https://api.themoviedb.org/3';
//   const END_POINT = '/trending/movie/week';
//   const API_KEY = '345007f9ab440e5b86cef51be6397df1';
//   const queryParams = new URLSearchParams({
//     api_key: API_KEY,
//     page: page,
//   });
//   try {
//     const response = await axios.get(`${BASE_URL}${END_POINT}?${queryParams}`);
//     return await response.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// // serviceMovie();
// -------------------------------------------------------------

// ********************************Infinity scroll ********************** \\

const container = document.querySelector('.js-movie-list');
const guard = document.querySelector('.js-guard');
let page = 1;

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

const observer = new IntersectionObserver(handlePagination, options);

async function render() {
  try {
    const data = await serviceMovie();

    container.insertAdjacentHTML('beforeend', createMarkup(data.results));

    if (data.page < data.total_pages) {
      observer.observe(guard);
    }

    // if (data.page < 500) {
    //   observer.observe(guard);
    // }
  } catch (error) {
    console.log(error);
  }
}
render();

async function serviceMovie(page = 1) {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const END_POINT = '/trending/movie/week';
  const API_KEY = '345007f9ab440e5b86cef51be6397df1';
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    page: page,
  });
  try {
    const response = await axios.get(`${BASE_URL}${END_POINT}?${queryParams}`);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
}

// serviceMovie();

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, release_date, original_title, vote_average }) => `
    <li class="movie-card">
    <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
    <div class="movie-info">
     <h2>${original_title}</h2>
     <p>Release date: ${release_date}</p>
     <p>Vote average: ${vote_average}</p>
     </div>
     </li>`
    )
    .join('');
}

function handlePagination(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;
      serviceMovie(page)
        .then(data => {
          container.insertAdjacentHTML('beforeend', createMarkup(data.results));

          if (data.page >= data.total_pages) {
            observer.unobserve(entry.target);
          }
          // if (data.page >= 500) {
          //   observer.unobserve(entry.target)!!!!!!!!!!!!  або observer.unobserve(quard) ;
          // }
        })
        .catch(error => console.log(error));
    }
  });
}

// ----------------------------------------------------------------
// const container = document.querySelector('.js-movie-list');
// const guard = document.querySelector('.js-guard');
// let page = 499;

// const options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0,
// };

// const observer = new IntersectionObserver(handlePagination, options);

// serviceMovie()
//   .then(data => {
//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));

//     if (data.page < data.total_pages) {
//       observer.observe(guard);
//     }
//   })
//   .catch(error => console.log(error));

// function serviceMovie(page = 1) {
//   const BASE_URL = 'https://api.themoviedb.org/3';
//   const END_POINT = '/trending/movie/week';
//   const API_KEY = '345007f9ab440e5b86cef51be6397df1';

//   const queryParams = new URLSearchParams({
//     api_key: API_KEY,
//     page: page,
//   });

//   return fetch(`${BASE_URL}${END_POINT}?${queryParams}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, release_date, original_title, vote_average }) => `
//         <li class="movie-card">
//             <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//             <div class="movie-info">
//                 <h2>${original_title}</h2>
//                 <p>Release date: ${release_date}</p>
//                 <p>Vote average: ${vote_average}</p>
//             </div>
//         </li>
//     `
//     )
//     .join('');
// }

// function handlePagination(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       console.log('ok');
//       page += 1;
//       serviceMovie(page)
//         .then(data => {
//           container.insertAdjacentHTML('beforeend', createMarkup(data.results));

//           if (data.page >= data.total_pages) {
//             observer.unobserve(entry.target);
//           }
//         })
//         .catch(error => console.log(error));
//     }
//   });
// }
