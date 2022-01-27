export interface commande{
    entree?:number,
    dessert?:number, 
    boisson?:number,
    the?:number,
    cafe?:number,
    livraison?:number
}
export interface IObserver{
    updatePrcie(data:commande);
}