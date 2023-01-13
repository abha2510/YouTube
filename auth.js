
class User{
   
    constructor(){
       
    }
   
    #checkUserName(username){

        let value=username.includes("#") ? false:true;
      
        return value;

    }

    #checkPassword(password){

        let value= password.length>8 ? true:false;
         
        return value;
   
    }

    async Signup(n,e,u,p,m,d){
      
     let isValidated=this.#checkUserName(u) && this.#checkPassword(p);
     
    //if user validated store data in ES6 class object

     if(isValidated){
        this.name=n;
        this.email=e;
        this.username=u;
        this.password=p;
        this.mobile=m;
        this.description=d;

        let acutal_data=JSON.stringify(this)
       

        //send it to server
     try{
        let res= await fetch(`https://masai-api-mocker.herokuapp.com/auth/register`,{
            method:"POST",
            body:acutal_data,
            headers:{
                "Content-Type":"application/json"
            },
        })
         
        let data=await res.json();
        //console.log(data)
        alert("User registered sucessfully!")
     }catch(err){
          console.log(err)
     }
     }
    }


    async Login(u,p){
        this.username=u;
        this.password=p;
        let login_data=JSON.stringify(this)
       

        try{

            let res=await fetch(`https://masai-api-mocker.herokuapp.com/auth/login`,{
                method:"POST",
            body:login_data,
            headers:{
                "Content-Type":"application/json"
            }
            })

            let data=await res.json();
         
               // alert("User Login sucessfully!")
            
        console.log(data)
        
        
        }catch(err){
            console.log(err)
        }
    }

}
 let u1=new User();
 let u2=new User()
//console.log(u2)


function Register(){

  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  const mobile=document.getElementById("mobile").value;
  const description=document.getElementById("description").value;
 
u1.Signup(name,email,username,password,mobile,description)


}


function Login(){
   
        const username=document.getElementById("username").value;
        const password=document.getElementById("password").value;
   
    u2.Login(username,password)
   // getProfile(username,token)
}


// async function getProfile(username,token){
//     const api=`https://masai-api-mocker.herokuapp.com/user/${username}`;
 
//      let res=await fetch (api,{
        
//          header:{
//              "Content-Type":"application/json",
//              Authorization:`Bearer ${token}`,
//          }
//      });
//     let data=await res.json();
//     console.log(data)
//  }