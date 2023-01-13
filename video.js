
//--------------------------------side navbar------------------------------------------


const openMenu=document.querySelector("#show-menu");
const hideMenuIcon=document.querySelector("#hide-menu");
const sideMenu=document.querySelector("#nav-menu");

openMenu.addEventListener("click",function(){
    sideMenu.classList.add("active");
})

hideMenuIcon.addEventListener("click",function(){
    sideMenu.classList.remove("active")
})




//-----------------------------------video page--------------------------------------




const video_details=document.getElementById("video_details")
const playVideo=()=>{
    let {videoId} =JSON.parse(localStorage.getItem("clicked_item"))


   //show video
   //show video title;
   //show discription

let iframe=document.createElement("iframe")
iframe.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
iframe.width='100%';
iframe.height="100%";
iframe.setAttribute("allowfullscreen",true)
video_details.append(iframe);

}




//----------------Recommandation-------------------------------



let recom_data=[
    {
        img:"https://th.bing.com/th/id/OIP.N0ydJSk97Gpu3AwoUXdZRQHaEK?w=308&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7",
        name:"Who is Shae Gill? Everything About Pasoori Fame Singer - The Teal Mango",
        rating:9.3
    },
    {
        img:"https://th.bing.com/th/id/OIP.8DZX-HHwkKBgqHRGDj2MSgHaFj?w=224&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7",
        name:"Shershaah Movie Poster : Shershaah Sidharth Malhotra Looks Intense In ..",
        rating:9.8
    },
    {
        img:"https://th.bing.com/th/id/OIP.EuIxqOe0Z7zRqui6ur1lGwHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7",
        name:"From Beast to Kaththi: Thalapathy Vijay's best first-look posters ...",
        rating:8.4
    },
    {
        img:"https://i.ytimg.com/vi/laCom2XAZcc/maxresdefault.jpg",
        name:"How to Ace Learn from Home | Yogesh Bhat | Co-Founder, Masai School ...",
        rating:8.9

    }
]


localStorage.setItem("recom",JSON.stringify(recom_data));

let data=JSON.parse(localStorage.getItem("recom"));

function appendrecom(data){
    let data_div=document.getElementById("recommendation");

    data_div.innerHTML=null;

    data.forEach(function(el){
        let div=document.createElement("div");
        let name=document.createElement("p");
        name.innerHTML=` ${el.name}`;

        let rating=document.createElement("p");
        rating.innerHTML=`Rating: ${el.rating}`;

        let img=document.createElement("img");
        img.id="poster";
        img.src=el.img;

        div.append(img,name,rating);
        data_div.append(div)
    })
}
appendrecom(data)






//----------------------------------------search-------------------------------------



const API_KEY=`AIzaSyCSQCfUz7ru_hqczYfyG_41iwAzfuKvLUo`


const searchVideos=async()=>{
    try{
    const query=document.getElementById("query").value;

   const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`);
   const data=await res.json();
   console.log(data)
   const actual_data=data.items;
   //console.log(actual_data)
 
   appendVideos(actual_data)

    }catch(err){
        console.log(err)
    }
}

const appendVideos=(data)=>{
    const container_id=document.getElementById("container");
    container_id.innerHTML=null;

    data.forEach(({snippet,id})=>{
         const title=snippet.title;
         const  videoId=id.videoId;
         const thumbnail=snippet.thumbnails.high.url;
         const channel_name=snippet.channelTitle;
         
         const div=document.createElement("div");
         const img=document.createElement("img");
         img.src=thumbnail

         const title_html=document.createElement("h4");
         title_html.innerText=title;

         const channel_html=document.createElement("h5");
         channel_html.innerText=channel_name;

         let data={
            videoId,
            snippet,
         }

         div.onclick=()=>{
           storeClickvideo(data)
         }

         div.append(img,title_html,channel_html)
         container_id.append(div)
         
    })
    
}

// const showVideo=(x)=>{
//     window.location.href="video.html";
//     x=JSON.stringify(x)
//     localStorage.setItem(x)
// }
function storeClickvideo(data){
    localStorage.setItem("clicked_item",JSON.stringify(data))
    window.location.href="video.html";
}