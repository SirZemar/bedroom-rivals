export class Pokemon {

    constructor(name, id, type, hp, attack, defense, accuracy, speed, img, baseStatHp = hp) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.accuracy = accuracy;
        this.speed = speed;
        this.img = img;
        this.maxHP = hp;
        this.dead = false;
        this.baseStatHp = baseStatHp;
        this.powerLevel = baseStatHp + attack + defense + accuracy + speed;
    };

}