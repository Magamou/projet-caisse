import { IPlat } from "../Interfaces/plat";

export class PlatDeResistance implements IPlat{
    prix(): number {
        return 5000;
    }
}

export class PlatAvecOption implements IPlat{
    plat:IPlat;
    constructor(_plat:IPlat){
        this.plat=_plat;
    }
    prix(): number {
        return this.plat.prix();        
    }
}

