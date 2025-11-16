class Smoothie {
  constructor(
    customerName,
    size,
    basePrice,
    base,
    ingredients,
    ingredientPrices
  ) {
    this.customerName = customerName;
    this.size = size;
    this.basePrice = basePrice;
    this.base = base;
    this.ingredients = ingredients;
    this.ingredientPrices = ingredientPrices;
    this.orderDate = new Date();
  }

  // calculate total price
  calculateTotal() {
    const ingredientsTotal = this.ingredientPrices.reduce(
      (sum, price) => sum + price,
      0
    );
    return this.basePrice + ingredientsTotal;
  }

  // get the description of order
  getDescription() {
    const ingredientsList =
      this.ingredients.length > 0
        ? this.ingredients.join(", ")
        : "No additional ingredients";
    return `A ${this.size} smoothie with ${this.base} base, featuring: ${ingredientsList}`;
  }

  getFormattedDate() {
    return this.orderDate.toLocaleString();
  }

  renderHTML() {
    const total = this.calculateTotal();
    const ingredientsList =
      this.ingredients.length > 0
        ? this.ingredients
            .map(
              (ing, idx) =>
                `<div class="detail-row">
                    <span class="detail-label">${ing}</span>
                    <span class="detail-value">$${this.ingredientPrices[
                      idx
                    ].toFixed(2)}</span>
                </div>`
            )
            .join("")
        : '<div class="detail-row"><span class="detail-label">No additional ingredients</span><span class="detail-value">$0.00</span></div>';
    return `
            <div class="smoothie-result">
                <h2>Order for ${this.customerName}</h2>
                <div class="smoothie-image"></div>
                <div class="smoothie-details">
                    <div class="detail-row">
                        <span class="detail-label">Size:</span>
                        <span class="detail-value">${this.size}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Base:</span>
                        <span class="detail-value">${this.base}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Base Price:</span>
                        <span class="detail-value">$${this.basePrice.toFixed(
                          2
                        )}</span>
                    </div>
                    ${ingredientsList}
                    <div class="detail-row">
                        <span class="detail-label">TOTAL:</span>
                        <span class="detail-value">$${total.toFixed(2)}</span>
                    </div>
                </div>
                <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
                    ${this.getDescription()}
                </p>
            </div>
        `;
  }
}

document.getElementById('smoothieForm').addEventListener('submit', function(e){
    e.preventDefault();

    const customerName = document.getElementById('customerName').value.trim();
    const sizeRadio = document.querySelector('input[name="size"]:checked');
    const size = sizeRadio.value;
    const basePrice = parseFloat(sizeRadio.dataset.price);
    const base = document.getElementById('base').value;
    const ingredientCheckboxes = document.querySelectorAll('input[name="ingredients"]:checked');
    const ingredients = [];
    const ingredientPrices = [];

    ingredientCheckboxes.forEach(checkbox => {
        ingredients.push(checkbox.value);
        ingredientPrices.push(parseFloat(checkbox.dataset.price));
    });

    if(ingredients.length === 0){
        alert("Please select at least one ingredient for your smoothie!");
        return;
    }

    const smoothie = new Smoothie(customerName, size, basePrice, base, ingredients, ingredientPrices);
    const orderDisplay = document.getElementById('orderDisplay');
    orderDisplay.innerHTML = smoothie.renderHTML();

    console.log('Smoothie Order Created:', smoothie);
    console.log('Total Price:', smoothie.calculateTotal());
    console.log('Description:', smoothie.getDescription())
})

