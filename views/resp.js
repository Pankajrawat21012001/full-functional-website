const burger=document.querySelector(".navbar .nav_container .burger");
const menu_list=document.querySelector(".navbar .nav_container ul");

if  (screen.width <= 579) {
    burger.addEventListener("click",()=>{
        menu_list.style.opacity=1;
        menu_list.style.display="flex";
        burger.style.display="none";
    });
    menu_list.addEventListener("click",()=>{
        menu_list.style.opacity=0;
        menu_list.style.display="none";
        burger.style.display="block";
});}else {
    menu_list.style.opacity=1;
    menu_list.style.display="flex";
    burger.style.display="none";
}