export class Transaction{
    constructor(
        private name:string,
        private type:string,
        private montant:number,
        private motif:string){
    }
    getTransaction(){
        return this;
    }
    getName(){
        return this.name;
    }
    getType(){
        return this.type;
    }
    getMontant(){
        return this.montant;
    }
    getMotif(){
        return this.motif;
    }
}