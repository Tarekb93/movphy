const form = document.querySelector("form");
const movieName = document.querySelector("#movie-name");
const box1 = document.querySelector(".box1");
const box1Overview = document.querySelector("#overview");
const box1VoteAverage = document.querySelector("#vote-average");
const box1ReleaseDate = document.querySelector("#release-date");

const box2 = document.querySelector(".box2");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(encodeURI(movieName.value));
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=b60ae9b51cc2590a794266a877ec91d5&query=${encodeURI(
      movieName.value
    )}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
        box1.classList.remove("box1");
      console.log(json);
      box1Overview.textContent =  json.results[0].overview;
      box1VoteAverage.textContent = "Vote-Average: " + json.results[0].vote_average;
      box1ReleaseDate.textContent = "Release Date: " + json.results[0].release_date;
    })
    .catch((error) => {
      console.error(error);
    });

  fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURI(
      movieName.value)}&api_key=K981SlP41yFCsojUx7HMKxw1sxQNbUdF`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      console.log(json);
    //   console.log(box2  )
      box2.src = json.data[0].images.downsized_large.url;
    })
    .catch((error) => {
      console.error(error);
    });
});

//               if (error.message === "404") {
//                 output.textContent = `⚠️ Couldn't find "${name}"`;
//               } else {
//                 output.textContent = "⚠️ Something went wrong";
//               }
//             });
//         });
//       </script>
