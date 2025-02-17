
// Get Time 
function getTime(time){
  const day = parseInt(time /86400);
  let remainingSecond = time % 86400;
  const hour = parseInt(remainingSecond / 3600);
  remainingSecond = remainingSecond % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${day} days ${hour} hour ${minute} minute ${remainingSecond} second ago`
}

//Create loadCategories 
const loadCategories = () =>{
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCatagories(data.categories))
  .catch((erro) => console.log(erro))
}
// Load Videos 
const loadVideos = (searchText = '', soryByviews = false) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res => res.json())
  .then(data =>{
    let videos = data.videos;
    displayVideos(videos);
    // sortVideo(videos)
  })
  .catch((erro) => console.log(erro))
}

// Load Category Videos

const loadCategoryVideos=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then((data) =>{
    removeActiveCalss();
    const activeBtn = document.getElementById(`btn-${id}`);
    // console.log(activeBtn)
    activeBtn.classList.add("active");
    displayVideos(data.category)
  })
  .catch((erro) => console.log(erro))
}
// Remove Active Class 

const removeActiveCalss=()=>{
const buttons = document.getElementsByClassName("category-btn");
console.log(buttons)
for(let btn of buttons){
  btn.classList.remove("active")
}
}
// Load Details 
const loadDetails = async (videoId) =>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
}
// Display Detailes 
const displayDetails = (video) =>{
const detailsContainer = document.getElementById('modal-content');
detailsContainer.innerHTML = `
<img src=${video.thumbnail} />
<p>${video.title}</p>
`
document.getElementById("customModal").showModal();
}

// Create DisplayCatagories
const displayCatagories = (categories)=>{
  const catagoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
       <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class=" btn category-btn" >
       ${item.category}
       </button>
      `
      catagoryContainer.append(buttonContainer)
    });
}
// Sort Video 

const sortVideo= (id) => {
  const sortData = id.forEach((item) => {
    loadVideos(sortData)
    console.log(item)
  })
}


// Display Video 

const displayVideos = (videos) =>{

  const videoContainer = document.getElementById("videos");
  videoContainer.classList.remove("grid");
  videoContainer.innerHTML= "";

  if(videos.length == 0){
    videoContainer.innerHTML = ` 
    <div class=" min-h-[300px] text-center w-full flex flex-col gap-5 justify-center items-center ">
    <img src=" ./assets/Icon.png " />
    <h3>No Video funded</h3>
    </div>
    `
  }
  else{
    videoContainer.classList.add("grid");
  }

  videos.forEach((video)=>{

    const card = document.createElement("div");
    card.classList = 'card card-conpact'
    card.innerHTML = `
    <figure class=" h-[200px] relative ">
    <img class="w-full object-cover "
    src="${video.thumbnail}"  />
    ${video.others.posted_date?.length == 0? "" :`<span class=" absolute right-2 bottom-2 bg-black text-white ">${getTime(video.others.posted_date)}</span>` }

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
    <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white ">details</button></p>
    </div>
  </div>`;
  videoContainer.append(card)
  })
}

document.getElementById('search-input').addEventListener("keyup", (e) =>{
  loadVideos(e.target.value)
  // loadVideos(e.target.vlaue)
})


loadCategories()
loadVideos()