import { IObserver } from "./observer.interface";
export interface ICommande{
    subscribe();
    unsubscribe();
    notifyObserver();
}