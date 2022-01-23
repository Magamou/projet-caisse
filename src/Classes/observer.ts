import { IObserver } from "../Interfaces/IObserver";
import { IView } from "../Interfaces/IView";
import { Transaction } from "./transaction";


export class solde_nbstrans_state implements IObserver {
    private t_debit:number;
    private t_credit:number;
    private solde: number;
  constructor(private view:IView) {
      this.t_debit=0;
      this.t_credit=0;
      this.solde=0;
  }
  update(data: Transaction[]) {
    console.log("Class: solde_nbtrans_sate--", data);
    this.solde=0;
    this.t_credit=0;
    this.t_debit=0;
    data.forEach((obj) => {
      if (obj.getType() === "Debit") {
        this.t_debit += 1;
        this.solde-=obj.getMontant();
      }

      else{
        this.t_credit += 1;
        this.solde+=obj.getMontant();
      }
    });
    console.log(`solde: ${this.solde}  tc:${this.t_credit}  td:${this.t_debit}`);
    this.view.Render(this.solde, this.t_credit, this.t_debit);
  }
}

export class List implements IObserver {
  constructor(private view: IView) {}
  update(data: any[]) {
    this.view.Render(data);
  }
}
export class Personal implements IObserver {
  private uniqueName: any[];
  constructor(private view: IView) {
    console.log("personalTrans work");
  }
  update(data: Transaction[]) {
    this.uniqueName = Array.from(
      new Set(
        data.map((obj) => {
          return obj.getName();
        })
      )
    );
    console.log("Update personalTrans", this.uniqueName);
    this.view.Render(data, this.uniqueName);
  }
}