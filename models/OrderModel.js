export default class OrderModel{
    constructor(id,item_id,customer_id,price,qty,total) {
        this._id = id;
        this._item_id = item_id;
        this._customer_id = customer_id;
        this._price = price;
        this._qty = qty;
        this._total = total;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}