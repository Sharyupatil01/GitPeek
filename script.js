const url = "https://api.github.com/users/";

const get=(element)=> document.getElementById(`${element}`);

const input=get("input");
const btn=get("btn");

// Action listerner on the button of serach 
btn.addEventListener('click',()=>
{
    if(input.value !=="")
    {
        getUserData(url + input.value);
    }
})

// if the input is typed and keypad 
// have entered the enter key then the function will be called
input.addEventListener('keydown',(e)=>{
    if(e.key==='Enter')
    {
        if(input.value!=="")
        {
            getUserData(url + input.value);
        }
    }
},false);

async function getUserData(gitUrl)
{
   const response=await fetch(gitUrl);
   const data=await response.json();
   if(!data)
   {
    throw data;
   }
   updateprofile(data);

}

const noresults=get("noresult");
let datesegment;

function updateprofile(data)
{
    noresults.style.scale=0;
    if(data.message !=="Not Found")
    {
        function checknull(apiItem, domItem)
        {
            if(apiItem === "" ||apiItem ===null)
            {
                domItem.style.opacity = 0.5;
                domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else{
                return true;
            }
        }


        const userimage=get("userImage");
        const name=get("name");
        const username=get("username");
        const date=get("joindate");
        const repos=get("repos");
        const followers=get("followers");
        const following=get("following");
        const pbio=get("profileBio");
        const location=get("location");
        const website=get("website");
        const twitter=get("twitter");
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        userimage.src=`${data.avatar_url}`;
        name.innerText=data?.name;
        username.innerText=`@${data?.login}`;
        username.href=data?.html_url;
        datesegment = data?.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegment[2]} ${month[datesegment[1] - 1]} ${datesegment[0]}`;

        pbio.innerText=(data?.bio === null) ?"This Profile has no bio":data?.bio;

        repos.innerText=data?.public_repos;
        repos.href=data?.repos_url;
        followers.innerText=data?.followers;
        followers.href=data?.followers_url;
        following.innerText=data?.following;
        following.href=data?.following_url;
        twitter.innerText = checknull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";

        twitter.href = checknull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";

        location.innerText=checknull(data?.location,location)? data?.location:"Not found";
        website.innerText=checknull(data?.blog,website)? data?.blog:"Not found";
        website.href = checknull(data?.blog, website) ? data?.blog : "#";

    
        

    }
   else {
        noresults.style.scale = 1;
        setTimeout(() => {
            noresults.style.scale = 0;
        }, 2500);
    }
}
getUserData(url + "Sharyupatil01");