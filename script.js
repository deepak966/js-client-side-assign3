class Smoothie {
    constructor(customerName, size, basePrice, base, ingredients, ingredientPrice) {
        this.customerName = customerName;
        this.size = size;
        this.basePrice = basePrice;
        this.base = base;
        this.ingredients = ingredients;
        this.ingredientPrice = ingredientPrice;
        this.orderDate = new Date();
    }
}