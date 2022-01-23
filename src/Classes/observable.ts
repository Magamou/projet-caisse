import {IObserver} from '../Interfaces/IObserver'
import { ISubject } from '../Interfaces/ISubject'
import { Transaction } from './transaction'; 
export class Caisse implements ISubject{
    private observers:IObserver[];
    private transactions:Transaction[];
    constructor(private solde:number){
        this.transactions=[];
        this.observers=[];
        // console.log("Caisse Works");
        this.notifyObserver();

    }
    subscribe(observer: IObserver) {
        this.observers.push(observer);
        this.notifyObserver();
    }
    unsubscribe(observer: IObserver) {
        this.observers=this.observers.filter((obs) => {
            return obs !== observer;
        })
    }
    notifyObserver() {
        this.observers.forEach((obs)=>{
            obs.update(this.transactions);
        })
    }
    addTransaction(trans:Transaction){
        this.transactions.push(trans);
        // console.log("Add Transaction", this.transactions);
    }
}