export class Pokemon {

    constructor(name, id, type, hp, attack, attackSpecial, accuracy, speed) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.hp = hp * 20;
        this.attack = attack;
        this.attackSpecial = attackSpecial;
        this.accuracy = accuracy;
        this.speed = speed;
    };

}