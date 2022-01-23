import { Transaction } from "../Classes/transaction";

export interface IView{
    Render(...args: 
        [solde: number, tcredit: number, tdebit: number] | 
        [data: Transaction[]] | 
        [data: Transaction[], utable: any]);
}

