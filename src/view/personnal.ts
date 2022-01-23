import { Transaction } from "../Classes/transaction";
import { IView } from "../Interfaces/IView";

export class personalTable implements IView{
    constructor(){}
    Render(data: Transaction[], uniqueName: any[]) {
        let table = document.querySelector("#autor");
        table.innerHTML = "";
        for (let i = 0; i < uniqueName.length; i++) {
          let arr1 = data.filter((e) => {
            return e.getName() === uniqueName[i];
          });
          let name = arr1[0].getName();
          let totalDebit = 0;
          let totalCredit = 0;
          arr1.forEach((e) => {
            if (e.getType() === "Debit") {
              totalDebit += e.getMontant();
            } else {
              totalCredit += e.getMontant();
            }
          });
          console.log(
            `name:${name} totalCredit:${totalCredit} totalDebit:${totalDebit}`
          );
          table.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
                <td>${name}</td>
                <td>${totalDebit}</td>
                <td>${totalCredit}</td>
                <td>${totalCredit - totalDebit}</td>
            </tr>
            `
          );
        }
      }//
}