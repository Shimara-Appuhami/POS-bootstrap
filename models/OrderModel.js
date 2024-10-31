export default class OrderModel{
    constructor(id,itemId,customerId,price,qty,total) {

        this._id = id;
        this._price = price;
        this._qty = qty;
        this._total = total;
        this._itemId = itemId;
        this._customerId = customerId;

    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
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