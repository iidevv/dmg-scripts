(function () {
  var storeHash = "4n3dh09e13";
  var categoryId = "416";
  var container = document.getElementById("category-products");

  fetch(
    "https://warehouse.discountmotogear.com/bigcommerce-api/products?categories:in=416&limit=4",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      var products = data.data;
      products.forEach(function (product) {
        console.log(product);
        // var productDiv = document.createElement("div");
        // productDiv.className = "Product";

        // var productTitle = document.createElement("h2");
        // productTitle.className = "Product-title";
        // productTitle.textContent = product.name;
        // productDiv.appendChild(productTitle);

        // var productImage = document.createElement("div");
        // productImage.className = "Product-image";
        // var img = document.createElement("img");
        // img.src = product.primary_image.url_standard;
        // img.alt = product.name;
        // productImage.appendChild(img);
        // productDiv.appendChild(productImage);

        // var productPrice = document.createElement("div");
        // productPrice.className = "Product-price";
        // productPrice.textContent = product.price.price;
        // productDiv.appendChild(productPrice);

        // var productLink = document.createElement("a");
        // productLink.href = "/products/" + product.custom_url.url;
        // productLink.className = "Product-link";
        // productLink.textContent = "Read More";
        // productDiv.appendChild(productLink);

        // container.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
})();
