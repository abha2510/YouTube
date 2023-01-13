

//-----------------side navbar---------


const openMenu=document.querySelector("#show-menu");
const hideMenuIcon=document.querySelector("#hide-menu");
const sideMenu=document.querySelector("#nav-menu");

openMenu.addEventListener("click",function(){
    sideMenu.classList.add("active");
})

hideMenuIcon.addEventListener("click",function(){
    sideMenu.classList.remove("active")
})





//---------------searchbar----------------//

//const API_KEY=`AIzaSyD5Gs0LKqoMgmUUbx8HvHKDPA8nmaXZm9U`;
//const API_KEY=`AIzaSyBw6bqJRBUmUMbSLb2nlE92MPFzXlL6p1s`
//const API_KEY=`AIzaSyBHZwxaavMd6CN0Quk3r8QmW91y_Sh3yJ4`;
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

//-------------------------------------------------landingpage video----------------------------



//const api_key=`AIzaSyBw6bqJRBUmUMbSLb2nlE92MPFzXlL6p1s`;
const api_key=`AIzaSyCSQCfUz7ru_hqczYfyG_41iwAzfuKvLUo`

const video=async()=>{
    try{
        const res=await fetch(` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${api_key}`);
        
       // const res=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key==${api_key}`)
        
        const data=await res.json();
        let items = data.items;
       console.log(data )
        append(items)
        //console.log(items);
    }catch(err){
        console.log(err)
    }
    
}
  video()      
        

  const append=(data)=>{
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