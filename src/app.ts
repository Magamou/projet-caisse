import { Transaction } from "./Classes/transaction";
import {Caisse} from './Classes/observable';
import { solde_nbstrans_state, List, Personal } from "./Classes/observer";
import { viewSts } from "./view/s_nt_st";
import {DrowList} from "./view/list";
import {personalTable} from "./view/personnal"

let htmlFullname = document.querySelector("#fullname") as HTMLInputElement;
let htmlType = document.querySelector("#type") as HTMLSelectElement;
let htmlMontant = document.querySelector("#montant") as HTMLInputElement;
let htmlMotif = document.querySelector("#motif") as HTMLInputElement;
let button = document.querySelector("#valid") as HTMLButtonElement;

const caisse=new Caisse(0);

const snc=new solde_nbstrans_state(new viewSts());
const listTr=new List(new DrowList());
const personal=new Personal(new personalTable());

caisse.subscribe(snc);
caisse.subscribe(listTr);
caisse.subscribe(personal);

button.addEventListener("click", (e) => {
  const tr=new Transaction(
      htmlFullname.value,
      htmlType.value, 
      +htmlMontant.value,
      htmlMotif.value)
      caisse.addTransaction(tr);
      caisse.notifyObserver();
});
