import { ISubject } from "./ISubject";
import { Transaction } from "../Classes/transaction";
// export interface IObserver{
//     update(data:any []);
// }

export interface IObserver{
    update(data:Transaction[]);
}