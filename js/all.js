"use strict";var slide_hero=new Swiper(".slide-principal",{effect:"fade",autoplay:{delay:5e3,disableOnInteraction:!1}}),slide_plans=new Swiper(".slide-plans",{slidesPerView:3,spaceBetween:10,breakpoints:{320:{slidesPerView:1,spaceBetween:10},480:{slidesPerView:1,spaceBetween:10},640:{slidesPerView:3,spaceBetween:10}}}),openModalBtns=document.querySelectorAll("#open-modal"),closeModalBtn=document.querySelector("#close-modal"),modal=document.getElementById("modal");openModalBtns.forEach(function(e){e.addEventListener("click",function(){modal.style.display="flex"})}),closeModalBtn.addEventListener("click",function(){modal.style.display="none"}),window.addEventListener("click",function(e){e.target==modal&&(modal.style.display="none")});