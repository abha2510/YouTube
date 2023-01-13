//------------------------sidenavbar--------------

const openMenu=document.querySelector("#show-menu");
const hideMenuIcon=document.querySelector("#hide-menu");
const sideMenu=document.querySelector("#nav-menu");

openMenu.addEventListener("click",function(){
    sideMenu.classList.add("active");
})

hideMenuIcon.addEventListener("click",function(){
    sideMenu.classList.remove("active")
})


//---------------most popular-------------//



const container_id=document.getElementById("container");

const API_KEY=`AIzaSyD5Gs0LKqoMgmUUbx8HvHKDPA8nmaXZm9U`;

const video_http=`https://www.googleapis.com/youtube/v3/videos?`;

const channel=`https://www.googleapis.com/youtube/v3/channels?`

fetch(video_http + new URLSearchParams({
    key:API_KEY,
    part:`snippet`,
    chart:`mostPopular`,
    maxResults:50,
    regionCode:`IN`
}))

.then(res=>res.json())
.then(data=>{
   // console.log(data)

   data.items.forEach(item=>{
    
    getchannelIcon(item);
   })
})
.catch(err=>console.log(err))


const getchannelIcon=(video_data)=>{
   fetch(channel + new URLSearchParams({
    key:API_KEY,
    part:`snippet`,
    id:video_data.snippet.channelId
   }))
   .then(res=>res.json())
   .then(data=>{
     
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    console.log(video_data)
  makeVideoCard(video_data)
  //appendVideos(video_data)
   })
}

const makeVideoCard=(data)=>{
  container_id.innerHTML+=`
  <div class="video" onclick="location.href="//https://youtube.com/watch?v=${data.id}"">
  <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
  <div class="content">
      <img src="${data.channelThumbnail}" alt="" class="channel-icon">
      <div class="info">
          <h4 class="title" ${data.snippet.channelTitle}></h4>
          <p class="channel-name"${data.snippet.channelTitle}></p>
      </div>
  </div>
</div>
  `
}
//-------------------------------------------------------------------------------------------------------------------------------
// const appendVideos=(data)=>{
//   const container_id=document.getElementById("container");
//   container_id.innerHTML=null;

//   data.forEach(({snippet,id})=>{
//        const title=snippet.title;
//        const  videoId=id.videoId;
//        const thumbnail=snippet.thumbnails.high.url;
//        const channel_name=snippet.channelTitle;
       
//        const div=document.createElement("div");
//        const img=document.createElement("img");
//        img.src=thumbnail

//        const title_html=document.createElement("h4");
//        title_html.innerText=title;

//        const channel_html=document.createElement("h5");
//        channel_html.innerText=channel_name;

//        let data={
//           videoId,
//           snippet,
//        }

//        div.onclick=()=>{
//          storeClickvideo(data)
//        }

//        div.append(img,title_html,channel_html)
//        container_id.append(div)
       
//   })
  
// }

// // const showVideo=(x)=>{
// //     window.location.href="video.html";
// //     x=JSON.stringify(x)
// //     localStorage.setItem(x)
// // }
function storeClickvideo(data){
  localStorage.setItem("clicked_item",JSON.stringify(data))
  window.location.href="video.html";
}


