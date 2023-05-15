document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("dmg-products")) return;
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
  if (!document.getElementById("ymm-search")) return;
  (async () => {
    try {
      const ymmContainer = document.getElementById("ymm-search");
      const ymmForm = `<div id="fitment-form" class="fitment-form ng-pristine ng-invalid ng-touched">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ymm-classification">Type</label>
                            <select id="ymm-classification" class="form-control ng-pristine ng-invalid ng-touched">
                                <option selected="selected" value="null" class="ng-star-inserted">
                                    Type </option>
                                <option value="4" class="ng-star-inserted"> ATV/UTV </option>
                                <option value="7" class="ng-star-inserted"> Ebike </option>
                                <option value="2" class="ng-star-inserted"> Off-Road
                                    Motorcycle </option>
                                <option value="5" class="ng-star-inserted"> Snow </option>
                                <option value="1" class="ng-star-inserted"> Street </option>
                                <option value="6" class="ng-star-inserted"> Water </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="ymm-year">Year</label>
                            <select id="ymm-year" class="form-control ng-untouched ng-pristine ng-invalid"
                                disabled="disabled">
                                <option selected="selected" value="null">Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="ymm-make">Make</label>
                            <select id="ymm-make" class="form-control ng-untouched ng-pristine ng-invalid"
                                disabled="disabled">
                                <option selected="selected" value="null">Make</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="ymm-model">Model</label>
                            <select id="ymm-model" class="form-control ng-untouched ng-pristine ng-invalid"
                                disabled="disabled">
                                <option selected="selected" value="null">Model</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="ng-star-inserted">
                            <h2 class="title-2" id="vehicle-title"></h2>
                        </div>
                        <div class="text-nowrap ng-star-inserted">
                            <button disabled id="ymm-search-btn" class="button button--primary">
                                Select This Vehicle
                            </button>
                        </div>
                        <p>
                            <span class="ng-star-inserted"> The search
                                results contemplate that a product fits the selected vehicle only in manufacturer’s
                                original configuration.
                            </span>
                        </p>
                    </div>
                </div>`;
      ymmContainer.innerHTML = ymmForm;
      const ymmVehicle = document.getElementById("ymm-classification");
      const ymmYear = document.getElementById("ymm-year");
      const ymmMake = document.getElementById("ymm-make");
      const ymmModel = document.getElementById("ymm-model");
      const ymmTitle = document.getElementById("vehicle-title");
      const ymmSubmit = document.getElementById("ymm-search-btn");
      const ymmData = {
        type: null,
        year: null,
        make: null,
        model: null,
      };

      const ymmSubmitForm = (hash) => {
        window.location.href = `/ymm-results?hash=${hash}&year=${ymmData.year}&make=${ymmData.make.name}&model=${ymmData.model.name}`;
      };

      const ymmSearch = async () => {
        let payload = {
          filter: {
            year: ymmData.year,
            vehicleClassification: ymmData.type,
            make: ymmData.make,
            model: ymmData.model,
          },
          modelPrecisionLevel: "MODEL",
        };
        const response = await fetch(
          "https://www.parts-unlimited.com/api/products/fitments/breakdowns/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access-control-allow-origin": "*",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.log("Error:" + response.status);
        }
      };

      ymmVehicle.addEventListener("change", async (e) => {
        ymmData.type = {
          code: e.target.value,
        };
        ymmData.year = null;
        ymmData.make = null;
        ymmData.model = null;
        ymmYear.innerHTML =
          '<option selected="selected" value="null">Year</option>';
        ymmMake.innerHTML =
          '<option selected="selected" value="null">Make</option>';
        ymmModel.innerHTML =
          '<option selected="selected" value="null">Model</option>';
        ymmYear.disabled = true;
        ymmMake.disabled = true;
        ymmModel.disabled = true;
        ymmTitle.style.display = "none";
        ymmSubmit.style.display = "none";
        ymmSubmit.disabled = true;
        try {
          const response = await ymmSearch();
          let options =
            '<option selected="selected" value="null">Year</option>';
          options += response.years.reverse().map((option) => {
            return `<option value="${option.value.filterEntity}">${option.value.displayName}</option>`;
          });
          ymmYear.innerHTML = options;
          ymmYear.disabled = false;
        } catch (error) {
          console.log(error);
        }
      });
      ymmYear.addEventListener("change", async (e) => {
        ymmData.year = e.target.value;
        ymmData.make = null;
        ymmData.model = null;
        ymmMake.innerHTML =
          '<option selected="selected" value="null">Make</option>';
        ymmModel.innerHTML =
          '<option selected="selected" value="null">Model</option>';
        ymmMake.disabled = true;
        ymmModel.disabled = true;
        ymmTitle.style.display = "none";
        ymmSubmit.style.display = "none";
        ymmSubmit.disabled = true;
        try {
          const response = await ymmSearch();
          let options =
            '<option selected="selected" value="null">Make</option>';
          options += response.makes.map((option) => {
            return `<option value="${option.value.filterEntity.id}">${option.value.displayName}</option>`;
          });
          ymmMake.innerHTML = options;
          ymmMake.disabled = false;
        } catch (error) {
          console.log(error);
        }
      });
      ymmMake.addEventListener("change", async (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        ymmData.make = {
          id: e.target.value,
          name: selectedOption.text,
        };
        ymmData.model = null;
        ymmModel.innerHTML =
          '<option selected="selected" value="null">Model</option>';
        ymmModel.disabled = true;
        ymmTitle.style.display = "none";
        ymmSubmit.style.display = "none";
        ymmSubmit.disabled = true;
        try {
          const response = await ymmSearch();
          let options =
            '<option selected="selected" value="null">Model</option>';
          options += response.models.map((option) => {
            return `<option value="${option.value.filterEntity.id}">${option.value.displayName}</option>`;
          });
          ymmModel.innerHTML = options;
          ymmModel.disabled = false;
        } catch (error) {
          console.log(error);
        }
      });
      ymmModel.addEventListener("change", async (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        ymmData.model = {
          id: e.target.value,
          name: selectedOption.text,
        };
        try {
          let payload = {
            year: ymmData.year,
            make: {
              id: ymmData.make.id,
            },
            model: {
              id: ymmData.model.id,
              segments: [],
              valid: true,
            },
          };
          const response = await fetch(
            "https://www.parts-unlimited.com/api/products/fitments/matches/aspects/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
              },
              body: JSON.stringify(payload),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            ymmTitle.style.display = "block";
            ymmTitle.textContent = `${ymmData.year} - ${ymmData.make.name} ${ymmData.model.name}`;

            ymmSubmit.style.display = "block";
            ymmSubmit.disabled = false;
            ymmSubmit.addEventListener("click", () => {
              ymmSubmitForm(data[0].id);
            });
          } else {
            console.log("Error:" + response.status);
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.error("Ymm error", error);
    }
  })();
});
