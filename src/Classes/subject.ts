import { ICommande } from "../Interfaces/menuOption";
import { IObserver } from "../Interfaces/observer.interface";

export class Commande implements ICommande{
    private observers:IObserver[];
    constructor(){

    }
    subscribe() {
        
    }
    unsubscribe() {
        
    }
    notifyObserver() {
        
    }
}