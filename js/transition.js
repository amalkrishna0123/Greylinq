gsap.registerPlugin(CustomEase);

CustomEase.create(
    "fluid",
    "0.83,0,0.17,1"
);

const paths=document.querySelectorAll(".layer");

const transition=document.getElementById("page-transition");

function pathClosed(){

return `

M0 0

L1000 0

L1000 1000

Q500 1000 0 1000

Z

`;

}

function pathOpen(offset){

return `

M0 0

L1000 0

L1000 ${offset}

Q500 ${offset-180} 0 ${offset}

Z

`;

}

paths[0].setAttribute("d",pathClosed());

paths[1].setAttribute("d",pathClosed());

paths[2].setAttribute("d",pathClosed());

function reveal(nextPage){

transition.style.visibility="visible";

transition.style.pointerEvents="all";

gsap.set(paths,{
attr:{d:pathOpen(1000)}
});

const tl=gsap.timeline({

defaults:{
ease:"fluid"
},

onComplete(){

window.location.href=nextPage;

}

});

tl.to(paths[0],{

duration:0.9,

attr:{d:pathOpen(0)}

},0)

.to(paths[1],{

duration:1,

attr:{d:pathOpen(0)}

},0.08)

.to(paths[2],{

duration:1.1,

attr:{d:pathOpen(0)}

},0.16);

}

function enter(){

transition.style.visibility="visible";

gsap.set(paths[0],{

attr:{d:pathOpen(0)}

});

gsap.set(paths[1],{

attr:{d:pathOpen(0)}

});

gsap.set(paths[2],{

attr:{d:pathOpen(0)}

});

gsap.timeline({

defaults:{
ease:"fluid"
},

onComplete(){

transition.style.visibility="hidden";

transition.style.pointerEvents="none";

}

})

.to(paths[2],{

duration:1,

attr:{d:pathOpen(1000)}

},0)

.to(paths[1],{

duration:0.95,

attr:{d:pathOpen(1000)}

},0.08)

.to(paths[0],{

duration:0.9,

attr:{d:pathOpen(1000)}

},0.16);

}

window.addEventListener("load",()=>{

enter();

});

document.querySelectorAll(".page-link").forEach(link=>{

link.addEventListener("click",(e)=>{

const url=link.href;

if(url===window.location.href)return;

e.preventDefault();

reveal(url);

});

});

window.onpageshow=()=>{

enter();

};