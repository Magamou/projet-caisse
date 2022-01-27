import { Dessert, Entree } from "./Classes/option";
import { PlatDeResistance } from "./Classes/plat.resistant";
import {IPlat}  from './Interfaces/plat';
let choix:IPlat[]=[];
const platSimple=new PlatDeResistance();
choix.push(platSimple);
console.log(`Plat de resistance: ${platSimple.prix()}`);
renderPrice(platSimple.prix());
// const platAvecDessert=new Dessert(platSimple);
// console.log(`Plat de resistance + Dessert: ${platAvecDessert.prix()}`);

// const p_ent_des=new Entree(platAvecDessert);
// console.log(`Plat de resistance + Entree + Dessert: ${p_ent_des.prix()}`);



let menu=document.querySelector("#menu") as HTMLSelectElement;

var i=0;
document.querySelector("#add").addEventListener("click", (e)=>{
    if(menu.className==="open"){
        menu.className="close";
    }
    else{
        menu.className="open";
    }
    
})

document.querySelector("#send").addEventListener("click", (e)=>{
    console.log("send");
})
let entree=document.querySelector("#entree") as HTMLInputElement;
let dessert=document.querySelector("#dessert") as HTMLInputElement;


dessert.addEventListener("click", (e)=>{
    if(dessert.checked){
        const platAvecDessert=new Dessert(choix[choix.length-1]);
        choix.push(platAvecDessert);
    }
    else{
        if(choix.length>1){
            choix.pop();
        }
    }
    renderPrice(choix[choix.length -1].prix());
})
//////////////functions
function renderPrice(price:number){
    document.querySelector("#price").innerHTML=price.toString();
}
function addEvent(check:HTMLInputElement, name:string){
    let plat:IPlat;
    switch(name){
        
    }
}