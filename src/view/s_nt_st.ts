import { Transaction } from "../Classes/transaction";
import { IView } from "../Interfaces/IView";
export class viewSts implements IView{
    private soldeValue:HTMLElement;
    private tcredit:HTMLElement;
    private tdebit:HTMLElement;
    private state:HTMLElement
    constructor(){
        this.soldeValue=document.querySelector('#solde-value');
        this.tdebit=document.querySelector('#totalDebit');
        this.tcredit=document.querySelector('#totalCredit');
        this.state=document.querySelector("#state-text");
        
    }
    Render(solde:number, tc:number, td:number){
        this.soldeValue.innerHTML=solde.toString();
        this.tcredit.innerHTML=tc.toString();
        this.tdebit.innerHTML=td.toString();
        this.state.className=solde>0?'crediteur':'debiteur';
    }
    
}