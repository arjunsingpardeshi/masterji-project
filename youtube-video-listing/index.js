

const videoCardContainer = document.querySelector(".video-container");
const searchInput = document.getElementById(`searchInput`);
const searchButton = document.getElementById(`searchButton`);

let videoCollection = []

async function getVideos(){
      const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
      const options = {method: 'GET', headers: {accept: 'application/json'}};

      try {
        const response = await fetch(url, options);
        const data = await response.json()
        console.log(data);
        videoCollection = data.data.data
        console.log(videoCollection);
        
        displayVideoList(videoCollection);
      } catch (error) {
        console.log(error);
      }
    }

getVideos()
function displayVideoList(videoList){
       videoCardContainer.innerHTML = ""
       videoList.forEach(video => {
          
        const thumbnail = video.items.snippet.thumbnails.high
        const videoTitle = video.items.snippet.title;
        const channelName = video.items.snippet.channelTitle

        const videoCardElement   = document.createElement(`div`);
        videoCardElement.className = `video-card-element`;

        videoCardElement.innerHTML = `
            <div class = "video-card">
                <div class = "thumbnail">
                    <a href = "https://www.youtube.com/watch?v=${video.items.id}" target = "_blank" title = "${videoTitle}">
                         <img src = "${thumbnail.url}" alt = "video thumbnail" width =  "100%">
                    </a>
                </div>
                <div class = "content">
                      <h4>${videoTitle}</h4>
                      <p>${channelName}</p>
                </div>
            </div>`;
             videoCardContainer.appendChild(videoCardElement);
       });
    }
    //     searchInput.addEventListener(`input`, () => {
    //     const search = searchInput.value.trim().toLowerCase();
    //     const searchVideo = videoCollection.filter((video) => {
    //         return video.items.snippet.title.toLowerCase().includes(search);
    //     });
        
    //     displayVideoList(searchVideo);
    // });

    searchButton.addEventListener(`click`, () => {
        const search = searchInput.value.trim().toLowerCase();
        const searchVideo = videoCollection.filter((video) => {
            return video.items.snippet.title.toLowerCase().includes(search);
        });
        
        displayVideoList(searchVideo);
    });

    