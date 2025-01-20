
//Create loadCategories 
const loadCategories = () =>{
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCatagories(data.categories))
  .catch((erro) => console.log(erro))
}
// Load Videos 
const loadVideos = () =>{
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(res => res.json())
  .then(data =>displayVideos(data.videos))
  .catch((erro) => console.log(erro))
}
// Create DisplayCatagories
const displayCatagories = (categories)=>{
  const catagoryContainer = document.getElementById("categories")
    categories.forEach((item) => {
      const button = document.createElement("button");
      button.classList = "btn mx-auto mx-5  ";
      button.innerText = item.category;
      catagoryContainer.append(button)
    });
}


// Display Video 

const displayVideos = (videos) =>{

  const videoContainer = document.getElementById("videos");
  videos.forEach((video)=>{
    console.log(video)

    const card = document.createElement("div");
    card.classList = 'card card-conpact'
    card.innerHTML = `
    <figure class=" h-[200px] relative ">
    <img class="w-full object-cover "
      src="${video.thumbnail}"  />
    <span class=" absolute right-2 bottom-2 bg-black text-white ">${video.others.posted_date}</span>
  </figure>
  <div class="px-0 py-2 flex  gap-2">
    <div>
    <img class=" border-2 border-base-500 w-10 h-10 rounded-full object-cover " src='${video.authors[0].profile_picture}'/>
    </div>
    <div>
    <h2 class=" font-bold " >${video.title }</h2>
    <div class="flex gap-2 items-center" >
    <p class=" text-gray-400 " >${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true?    `<img class="w-4 h-4" src='https://img.icons8.com/?size=100&id=KoB8RIISBmr1&format=png&color=228BE6' />` : '' }

    </div>
    <p></p>
    </div>
  </div>`;
  videoContainer.append(card)
  })
}


loadCategories()
loadVideos()