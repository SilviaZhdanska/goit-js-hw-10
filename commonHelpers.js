import"./assets/styles-9f2083c0.js";import{f as a,i as g}from"./assets/vendor-77e16229.js";function I(e){const y=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),D=Math.floor(e%36e5/6e4),h=Math.floor(e%6e4/1e3);return{days:y,hours:f,minutes:D,seconds:h}}function s(e){return e<10?`0${e}`:e}const c=document.getElementById("datetime-picker"),n=document.getElementById("start-button"),d=document.getElementById("days"),i=document.getElementById("hours"),u=document.getElementById("minutes"),l=document.getElementById("seconds");let m;a(c,{enableTime:!0,dateFormat:"Y-m-d H:i",minDate:"today",minuteIncrement:1,onClose:e=>{e[0]<=new Date?(g.error({title:"",message:"Please choose a date in the future"}),n.disabled=!0):n.disabled=!1}});n.addEventListener("click",()=>{const e=a.parseDate(c.value,"Y-m-d H:i"),r=new Date;e.getTime()-r.getTime(),m=setInterval(()=>{const o=e.getTime()-new Date().getTime();if(o<=0){clearInterval(m),d.textContent="00",i.textContent="00",u.textContent="00",l.textContent="00",n.disabled=!0,a(c).set("enable",!0);return}const t=I(o);d.textContent=s(t.days),i.textContent=s(t.hours),u.textContent=s(t.minutes),l.textContent=s(t.seconds)},1e3),a(c).set("enable",!1),n.disabled=!0});
//# sourceMappingURL=commonHelpers.js.map
