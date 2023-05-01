document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("dmg-products");

    try {
      const response = await fetch(
        "https://warehouse.discountmotogear.com/bigcommerce-api/products?categories:in=504&limit=4",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const products = data.data;

      const imagesData = await Promise.all(
        products.map((product) =>
          fetch(
            `https://warehouse.discountmotogear.com/bigcommerce-api/products/${product.id}/images`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((res) => res.json())
        )
      );

      const productsWithImages = products.map((product, index) => {
        return {
          ...product,
          images: imagesData[index].data,
        };
      });

      productsWithImages.forEach((product) => {
        const price =
          product.sale_price > 0
            ? `<div class="card-price" data-test-info-type="price">
                          <div class="price-section price-section--withoutTax non-sale-price--withoutTax ">
                              <span data-product-non-sale-price-without-tax="" class="price price--non-sale">
                                  $${product.price}
                              </span>
                          </div>
                          <div class="price-section price-section--withoutTax">
                              <span data-product-price-without-tax="" class="price price--withoutTax">
                                  $${product.sale_price}
                              </span>
                          </div>
                      </div>`
            : `<div class="card-price" data-test-info-type="price">
                                      <div class="price-section price-section--withoutTax non-sale-price--withoutTax ">
                                          <span data-product-non-sale-price-without-tax="" class="price">
                                              $${product.price}
                                          </span>
                                      </div>
                                  </div>`;
        const productArticle = `
                      <article class="card" data-product-id="${product.id}">
                      <a href="${product.custom_url.url}" class="card-figure">
                          <div class="themevale_badges">
                              <div class="sale-badge themevale_badge">
                                  <span class="text">Sale</span>
                              </div>
                          </div>
                          <img src="${product.images[0].url_standard}" alt="${product.name}"/>
                      </a>
                      <div class="card-body">
                          <h4 class="card-title">
                              <a href="${product.custom_url.url}" tabindex="0">${product.name}</a>
                          </h4>
                          <div class="card-wrapper">
                              ${price}
                          </div>
                          <div class="card-figcaption">
                          <a href="${product.custom_url.url}" data-event-type="product-click" class="button card-figcaption-button" data-product-id="${product.id}" tabindex="0">Choose Options</a>
                          </div>
                      </div>
                      </article>
                  `;

        container.insertAdjacentHTML("beforeend", productArticle);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })();
});
