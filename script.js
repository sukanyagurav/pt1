import { getFirestore, collection,onSnapshot, getDocs,query,where,addDoc } from './node_modules/firebase/firestore';
import { initializeApp } from "./node_modules/firebase/app";


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('#menu-toggler ul a')
const linkAction =()=>{
    document.querySelector('.menu-checkbox').checked=false
}
navLink.forEach(n=>n.addEventListener('click',linkAction))
// blur header
const blurHeader = ()=>{
    const header = document.getElementById('header')
    if(window.scrollY >=50){
        header.classList.add('blur-header')
    }
    else{
        header.classList.remove('blur-header');
    }
}

window.addEventListener('scroll',blurHeader)
// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", activeLink);
function activeLink(){
    const scrollY = window.pageYOffset
    sections.forEach(current=>{
        const sectionHeight= current.offsetHeight,
        sectionTop= current.offsetTop- 58,
        
        sectionId=current.getAttribute('id'),
        sectionClass=document.querySelector('#menu-toggler  a[href*='+sectionId + ']')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link')
        }
        else{
            sectionClass.classList.remove('active-link')
        }
    })
}
//carousel 
const carousel=document.querySelector('.carousel')
const arrowBtn=document.querySelectorAll('.arrowBtn')
const firstCardWidth =carousel.querySelector('.card').offsetWidth;
arrowBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        carousel.scrollLeft+= btn.id ===  'left' ? (-firstCardWidth ) : firstCardWidth
    
    })  
})
// 
const createItems=(props)=>{
    const liEl=document.createElement('li')
    liEl.className='card'
    const liContent=`
        <img src='${props.imageUrl}' alt="" class="card_image">
        <div class="buttons">
          <a href="${props.liveUrl}" target="_blank">
            <i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i>
          </a>
          <a href="${props.projectUrl}" target="_blank">
            <i class="fa-brands fa-github" aria-hidden="true"></i>
          </a>
          </div>
    `
    liEl.innerHTML=liContent
    carousel.appendChild(liEl)
}



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7eI3utl5GigAdniKoUg9vmOj7aED8e0w",
  authDomain: "fir-with-js-8a6db.firebaseapp.com",
  databaseURL: "https://fir-with-js-8a6db-default-rtdb.firebaseio.com",
  projectId: "fir-with-js-8a6db",
  storageBucket: "fir-with-js-8a6db.appspot.com",
  messagingSenderId: "953079074347",
  appId: "1:953079074347:web:7848890d90304e81b4646e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const collectionRef = collection(database, "Projects");

const loadMore =()=>{

}
let ageQuery;
let showData=1
const loadEle = document.querySelector('.loadMore')
loadEle.addEventListener('click',function(){
   
    // showData+=2
    // if(showData>0){
    //     showData++
    //     console.log(showData)
    // }
    ageQuery = query(
        collectionRef,
        where("id", ">=",showData),where('id','<',showData+3)
      );
    
    getData()
   showData+=3
})
 function getData() {
    
   onSnapshot(ageQuery,async (data) => {
    
    let  removeItem=carousel.removeChild(loadEle)
    
        let temp=data.docs.map((item) => {
            createItems({...item.data()});
            return {...item.data()}
        })
        if(!temp.length){
            carousel.removeChild(loadEle)
        }
        else{
            carousel.appendChild(removeItem)
           
        }

       
    });
 
  }
// animation
let tl = gsap.timeline({defaults: {ease: "power4.inOut"}})
let points = CSSRulePlugin.getRule(".divider::before")
tl.to('.name',{'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,y:0,duration:0.7})
.to('.text',{'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,y:0,duration:0.9})
.to('.downloadCV',{opacity:1,scale:1,duration:0.9},"-=1")
let tl2=gsap.timeline({
    scrollTrigger:{
        trigger:'.summary',
        scroller:'body',
        start:"top 70%",
        end:'bottom 2%',
        ease:Expo.easeInOut,
     toggleActions:"restart none none reverse"
    },
})
tl2.to('.summary',{'height':'auto',opacity:1,duration:0.8})
.to('.summary .title',{'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,duration:0.5,y:0})
.from(points,{opacity:0,transform:'translateY(100px)'})
.to('.event',{'height':'auto',opacity:1,duration:0.9,y:0,delay:0.5},"-=3")
.to('.date, .company, .university, .profession',{'clip-path': 'polygon(0 0, 0 100%, 100% 100%, 100% 0%)',delay:0.9,duration:0.9},"-=2")
.from('.divider',{scaleY:0,duration:"0.6"},"-=1")


let tl3=gsap.timeline({
    scrollTrigger:{
        trigger:'.skills',
        start:"top 50%",
        end:"bottom 10px",
        toggleActions:"restart none none reverse"
    },
})
tl3.to('.skills-title',{'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,duration:0.5,y:0})
.from('.skill-1',{scale:0,duration:0.2})
.from('.skill-2',{scale:0,delay:0.05,duration:0.3})
.from('.skill-3',{scale:0,delay:0.05,duration:0.3})
.from('.skill-4',{scale:0,delay:0.05,duration:0.3})
.from('.skill-5',{scale:0,delay:0.05,duration:0.3})
.from('.skill-6',{scale:0,delay:0.05,duration:0.3})

let tl4=gsap.timeline({
    scrollTrigger:{
        trigger:'.projects',
        start:"top 50%",
        end:"bottom 50px",
        toggleActions:"restart none none reverse"
    },
})
tl4.to('.heading--3',{'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,y:0,duration:0.4})
.to('.project-title',{'clip-path': 'polygon(0 0, 0 100%, 100% 100%, 100% 0%)',duration:1.3})
.to('.project-description',{'clip-path': 'polygon(0 0, 0 100%, 100% 100%, 100% 0%)',duration:0.9},"-=1")
.to('.project-technology',{'clip-path': 'polygon(0 0, 0 100%, 100% 100%, 100% 0%)',delay:1,duration:0.6},"-=1")
