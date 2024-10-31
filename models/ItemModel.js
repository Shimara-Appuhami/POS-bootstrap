export default class ItemModel{
    constructor(id,name1, price, quantity){
        this._id = id;
        this._name1 = name1;
        this._price = price;
        this._quantity = quantity;
        this._name1 = name1;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name1() {
        return this._name1;
    }

    set name1(value) {
        this._name1 = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}