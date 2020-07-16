const form = document.querySelector("form");
const movieName = document.querySelector("#movie-name");
const movieDetail = document.querySelector(".movieDetail");
const Overview = document.querySelector("#overview");
const VoteAverage = document.querySelector("#vote-average");
const ReleaseDate = document.querySelector("#release-date");
const suggestions=document.querySelector("#suggestions")
const notFound=document.querySelector("#notFound")
const container=document.querySelector(".background-image")


const giphy = document.querySelector(".giphy");
const leftSplit = document.querySelectorAll(".split")[0];
const rightSplit = document.querySelectorAll(".split")[1];

movieName.addEventListener("input",(event)=>{
    suggestions.innerHTML="";

    fetch(`https://api.giphy.com/v1/gifs/search/tags?q=${encodeURI(
        movieName.value)}&api_key=K981SlP41yFCsojUx7HMKxw1sxQNbUdF`)
        .then(response =>response.json())
        .then(json =>{
            json.data.forEach(element => {
                let newOption=document.createElement("option");
                newOption.value=element.name;
                suggestions.appendChild(newOption);
            });
        })
})
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
      
      movieDetail.classList.toggle("movieDetail",json.results.length  === 0)
      giphy.style.display = json.results.length  !== 0 && 'block'
      notFound.classList.toggle("movieDetail",json.results.length  !== 0)
      
      if(json.results.length  !== 0){
        
        leftSplit.style.display="block";
        rightSplit.style.display="block";
        Overview.textContent =  json.results[0].overview;
        VoteAverage.textContent = json.results[0].vote_average;
        ReleaseDate.textContent = json.results[0].release_date;
      }
      else{
        Overview.textContent =  "";
        VoteAverage.textContent = "";
        ReleaseDate.textContent = "";
        giphy.src = "";

      }

      
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
    //   console.log(giphy  )
      giphy.src = json.data[0].images.downsized_large.url;
      container.src = json.data[0].images.original_still.url
    })
    .catch((error) => {
      console.error(error);

    });
});
