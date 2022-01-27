import {PlatAvecOption} from './plat.resistant'
export class Entree extends PlatAvecOption{
    prix(): number {
        return super.prix() + 2000;
    }
}

export class Dessert extends PlatAvecOption{
    prix(): number {
        return super.prix() + 1500;
    }
}
export class Boisson extends PlatAvecOption{
    prix(): number {
        return super.prix() + 1000;
    }
}
export class The extends PlatAvecOption{
    prix(): number {
        return super.prix() + 700;
    }
}
export class Cafe extends PlatAvecOption{
    prix(): number {
        return super.prix() + 350;
    }
}

export class Livraison extends PlatAvecOption{
    prix(): number {
        return super.prix() + 1000;
    }
}