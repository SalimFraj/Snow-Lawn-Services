document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quote-form");
    const outputContainer = document.createElement("div");
    outputContainer.id = "output-container";
    form.parentNode.appendChild(outputContainer);


    // Determine promotions
    const currentMonth = new Date().getMonth();
    const isSummer = currentMonth >= 5 && currentMonth <= 8; // June to August
    const isWinter = currentMonth === 11 || currentMonth <= 1; // December to February

    // Show promotions
    if (isSummer) {
        alert("🌞 Summer Special! Get 10% off on all lawn mowing services!");
    } else if (isWinter) {
        alert("❄️ Winter Special! Get 15% off on all snow shoveling services!");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const age = parseInt(document.getElementById("age").value, 10);
        const service = document.getElementById("service").value;
        const landSize = parseFloat(document.getElementById("land-size").value);

        // Validate inputs
        if (!name || !email || isNaN(age) || isNaN(landSize)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        if (age < 18) {
            alert("You must be 18 or older to request a quote.");
            return;
        }

        
        const basePrice = 0.1; // Price per square foot
        let totalPrice = landSize * basePrice;

        if (isSummer) {
            totalPrice *= 0.9; // 10% off for summer
        } else if (isWinter && service === "snow-shoveling") {
            totalPrice *= 0.85; // 15% off for winter snow shoveling
        }


        // Display the results
        outputContainer.innerHTML = `
            <h3>Quote Summary</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Selected Service:</strong> ${service.replace("-", " ")}</p>
            <p><strong>Land Size:</strong> ${landSize} sq. ft.</p>
            <p><strong>Estimated Price:</strong> $${totalPrice.toFixed(2)}</p>
        `;
        outputContainer.style.marginTop = "20px";
        outputContainer.style.padding = "15px";
        outputContainer.style.border = "1px solid #ddd";
        outputContainer.style.backgroundColor = "#f9f9f9";
        outputContainer.style.borderRadius = "8px";
    });

});