document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("#tires-container")) return;
  // page template
  // <div id="tires-container">
  //     <div id="tires-search"></div>
  //     <div id="tires-results"></div>
  // </div>

  (async () => {
    const tiresSearchContainer = document.querySelector("#tires-search");
    const tiresResultsContainer = document.querySelector("#tires-results");
    const tiresForm = `<div id="fitment-form" class="fitment-form ng-pristine ng-invalid ng-touched">
                <div class="form-row form-row--tires">
                    <div class="form-group">
                        <label for="tires-segment">Vehicle</label>
                        <select id="tires-segment" class="form-control ng-untouched ng-pristine ng-invalid">
                            <option selected="selected" value="">Vehicle</option>
                            <option value="ATV / UTV" class="ng-star-inserted"> ATV / UTV </option>
                            <option value="Bicycle" class="ng-star-inserted"> Bicycle </option>
                            <option value="Cruiser / Street" class="ng-star-inserted"> Cruiser / Street </option>
                            <option value="Dual Sport" class="ng-star-inserted"> Dual Sport </option>
                            <option value="Off-Road" class="ng-star-inserted"> Off-Road </option>
                            <option value="Scooter" class="ng-star-inserted"> Scooter </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tires-width">Width</label>
                        <select id="tires-width" class="form-control ng-pristine ng-invalid ng-touched">
                            <option selected="selected" value="" class="ng-star-inserted">Width</option>
                            <option value="2&quot;" class="ng-star-inserted"> 2" </option>
                            <option value="2.25&quot;" class="ng-star-inserted"> 2.25" </option>
                            <option value="2.5&quot;" class="ng-star-inserted"> 2.5" </option>
                            <option value="2.75&quot;" class="ng-star-inserted"> 2.75" </option>
                            <option value="3&quot;" class="ng-star-inserted"> 3" </option>
                            <option value="3.25&quot;" class="ng-star-inserted"> 3.25" </option>
                            <option value="3.5&quot;" class="ng-star-inserted"> 3.5" </option>
                            <option value="3.6&quot;" class="ng-star-inserted"> 3.6" </option>
                            <option value="4&quot;" class="ng-star-inserted"> 4" </option>
                            <option value="4.1&quot;" class="ng-star-inserted"> 4.1" </option>
                            <option value="4.25&quot;" class="ng-star-inserted"> 4.25" </option>
                            <option value="4.5&quot;" class="ng-star-inserted"> 4.5" </option>
                            <option value="4.6&quot;" class="ng-star-inserted"> 4.6" </option>
                            <option value="4.8&quot;" class="ng-star-inserted"> 4.8" </option>
                            <option value="5&quot;" class="ng-star-inserted"> 5" </option>
                            <option value="5.1&quot;" class="ng-star-inserted"> 5.1" </option>
                            <option value="5.3&quot;" class="ng-star-inserted"> 5.3" </option>
                            <option value="5.7&quot;" class="ng-star-inserted"> 5.7" </option>
                            <option value="6&quot;" class="ng-star-inserted"> 6" </option>
                            <option value="6.5&quot;" class="ng-star-inserted"> 6.5" </option>
                            <option value="7&quot;" class="ng-star-inserted"> 7" </option>
                            <option value="8&quot;" class="ng-star-inserted"> 8" </option>
                            <option value="8.5&quot;" class="ng-star-inserted"> 8.5" </option>
                            <option value="9&quot;" class="ng-star-inserted"> 9" </option>
                            <option value="9.5&quot;" class="ng-star-inserted"> 9.5" </option>
                            <option value="10&quot;" class="ng-star-inserted"> 10" </option>
                            <option value="10.5&quot;" class="ng-star-inserted"> 10.5" </option>
                            <option value="11&quot;" class="ng-star-inserted"> 11" </option>
                            <option value="12&quot;" class="ng-star-inserted"> 12" </option>
                            <option value="12.5&quot;" class="ng-star-inserted"> 12.5" </option>
                            <option value="13&quot;" class="ng-star-inserted"> 13" </option>
                            <option value="14&quot;" class="ng-star-inserted"> 14" </option>
                            <option value="27&quot;" class="ng-star-inserted"> 27" </option>
                            <option value="27.5&quot;" class="ng-star-inserted"> 27.5" </option>
                            <option value="60" class="ng-star-inserted"> 60 </option>
                            <option value="70" class="ng-star-inserted"> 70 </option>
                            <option value="80" class="ng-star-inserted"> 80 </option>
                            <option value="90" class="ng-star-inserted"> 90 </option>
                            <option value="100" class="ng-star-inserted"> 100 </option>
                            <option value="110" class="ng-star-inserted"> 110 </option>
                            <option value="120" class="ng-star-inserted"> 120 </option>
                            <option value="130" class="ng-star-inserted"> 130 </option>
                            <option value="140" class="ng-star-inserted"> 140 </option>
                            <option value="150" class="ng-star-inserted"> 150 </option>
                            <option value="160" class="ng-star-inserted"> 160 </option>
                            <option value="165" class="ng-star-inserted"> 165 </option>
                            <option value="170" class="ng-star-inserted"> 170 </option>
                            <option value="180" class="ng-star-inserted"> 180 </option>
                            <option value="190" class="ng-star-inserted"> 190 </option>
                            <option value="200" class="ng-star-inserted"> 200 </option>
                            <option value="205" class="ng-star-inserted"> 205 </option>
                            <option value="210" class="ng-star-inserted"> 210 </option>
                            <option value="215" class="ng-star-inserted"> 215 </option>
                            <option value="225" class="ng-star-inserted"> 225 </option>
                            <option value="230" class="ng-star-inserted"> 230 </option>
                            <option value="240" class="ng-star-inserted"> 240 </option>
                            <option value="250" class="ng-star-inserted"> 250 </option>
                            <option value="260" class="ng-star-inserted"> 260 </option>
                            <option value="280" class="ng-star-inserted"> 280 </option>
                            <option value="300" class="ng-star-inserted"> 300 </option>
                            <option value="330" class="ng-star-inserted"> 330 </option>
                            <option value="MH" class="ng-star-inserted"> MH </option>
                            <option value="MT" class="ng-star-inserted"> MT </option>
                            <option value="MU" class="ng-star-inserted"> MU </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tires-aspect-ratio">Aspect Ratio</label>
                        <select id="tires-aspect-ratio" class="form-control ng-untouched ng-pristine ng-invalid">
                            <option selected="selected" value="">Aspect Ratio</option>
                            <option value="-" class="ng-star-inserted"> - </option>
                            <option value="7" class="ng-star-inserted"> 7 </option>
                            <option value="7.5" class="ng-star-inserted"> 7.5 </option>
                            <option value="30" class="ng-star-inserted"> 30 </option>
                            <option value="35" class="ng-star-inserted"> 35 </option>
                            <option value="40" class="ng-star-inserted"> 40 </option>
                            <option value="45" class="ng-star-inserted"> 45 </option>
                            <option value="50" class="ng-star-inserted"> 50 </option>
                            <option value="55" class="ng-star-inserted"> 55 </option>
                            <option value="60" class="ng-star-inserted"> 60 </option>
                            <option value="65" class="ng-star-inserted"> 65 </option>
                            <option value="70" class="ng-star-inserted"> 70 </option>
                            <option value="75" class="ng-star-inserted"> 75 </option>
                            <option value="80" class="ng-star-inserted"> 80 </option>
                            <option value="85" class="ng-star-inserted"> 85 </option>
                            <option value="90" class="ng-star-inserted"> 90 </option>
                            <option value="100" class="ng-star-inserted"> 100 </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tires-rim-diameter">Rim Diameter</label>
                        <select id="tires-rim-diameter" class="form-control ng-untouched ng-pristine ng-invalid">
                            <option selected="selected" value="">Rim Diameter</option>
                            <option value="10&quot;" class="ng-star-inserted"> 10" </option>
                            <option value="11&quot;" class="ng-star-inserted"> 11" </option>
                            <option value="12&quot;" class="ng-star-inserted"> 12" </option>
                            <option value="13&quot;" class="ng-star-inserted"> 13" </option>
                            <option value="14&quot;" class="ng-star-inserted"> 14" </option>
                            <option value="14''" class="ng-star-inserted"> 14'' </option>
                            <option value="6&quot;" class="ng-star-inserted"> 6" </option>
                            <option value="7&quot;" class="ng-star-inserted"> 7" </option>
                            <option value="8&quot;" class="ng-star-inserted"> 8" </option>
                            <option value="9&quot;" class="ng-star-inserted"> 9" </option>
                            <option value="15&quot;" class="ng-star-inserted"> 15" </option>
                            <option value="16&quot;" class="ng-star-inserted"> 16" </option>
                            <option value="17&quot;" class="ng-star-inserted"> 17" </option>
                            <option value="18&quot;" class="ng-star-inserted"> 18" </option>
                            <option value="19" class="ng-star-inserted"> 19 </option>
                            <option value="19&quot;" class="ng-star-inserted"> 19" </option>
                            <option value="20&quot;" class="ng-star-inserted"> 20" </option>
                            <option value="21&quot;" class="ng-star-inserted"> 21" </option>
                            <option value="22&quot;" class="ng-star-inserted"> 22" </option>
                            <option value="23&quot;" class="ng-star-inserted"> 23" </option>
                            <option value="24&quot;" class="ng-star-inserted"> 24" </option>
                            <option value="25&quot;" class="ng-star-inserted"> 25" </option>
                            <option value="27.5&quot;" class="ng-star-inserted"> 27.5" </option>
                            <option value="29&quot;" class="ng-star-inserted"> 29" </option>
                            <option value="30" class="ng-star-inserted"> 30 </option>
                            <option value="30&quot;" class="ng-star-inserted"> 30" </option>
                            <option value="35&quot;" class="ng-star-inserted"> 35" </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button id="tires-reset" class="button button--primary button--tires-reset">Reset</button>
                    </div>
                </div>
            </div>`;
    tiresSearchContainer.innerHTML = tiresForm;

    const tiresWidth = document.querySelector("#tires-width");
    const tiresAspectRatio = document.querySelector("#tires-aspect-ratio");
    const tiresRimDiameter = document.querySelector("#tires-rim-diameter");
    const tiresMarketSegment = document.querySelector("#tires-segment");
    const tiresReset = document.querySelector("#tires-reset");

    const tiresSelected = {
      width: "",
      aspectRatio: "",
      rimDiameter: "",
      segment: "",
    };

    let page = 0;
    let totalPages = 0;

    tiresReset.addEventListener("click", () => {
      window.location.reload();
    });

    const getTires = async (tiresSelected, page) => {
      try {
        const offset = page * 20;

        const payload = {
          filters: [],
          pagination: {
            limit: 20,
            offset: offset,
          },
        };
        if (tiresSelected.aspectRatio) {
          payload.filters.push({
            operator: "AND",
            matches: [
              {
                path: "attributes.name.verbatim",
                value: "Aspect Ratio",
                valueMatchMethod: "EXACT",
                inBaseline: false,
              },
              {
                path: "attributes.value.verbatim",
                values: [tiresSelected.aspectRatio],
              },
            ],
          });
        }
        if (tiresSelected.segment) {
          payload.filters.push({
            operator: "AND",
            matches: [
              {
                path: "attributes.name.verbatim",
                value: "Market Segment",
                valueMatchMethod: "EXACT",
                inBaseline: false,
              },
              {
                path: "attributes.value.verbatim",
                values: [tiresSelected.segment],
              },
            ],
          });
        }
        if (tiresSelected.rimDiameter) {
          payload.filters.push({
            operator: "AND",
            matches: [
              {
                path: "attributes.name.verbatim",
                value: "Rim Diameter",
                valueMatchMethod: "EXACT",
                inBaseline: false,
              },
              {
                path: "attributes.value.verbatim",
                values: [tiresSelected.rimDiameter],
              },
            ],
          });
        }
        if (tiresSelected.width) {
          payload.filters.push({
            operator: "AND",
            matches: [
              {
                path: "attributes.name.verbatim",
                value: "Width",
                valueMatchMethod: "EXACT",
                inBaseline: false,
              },
              {
                path: "attributes.value.verbatim",
                values: [tiresSelected.width],
              },
            ],
          });
        }

        const response = await fetch(
          "https://www.parts-unlimited.com/api/parts/search/tires",
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
          const products = data.result.hits
            .map((product) => createProduct(product))
            .join("");
          totalPages = Math.ceil(data.result.total / 20);
          return products;
        } else {
          console.log("Error:" + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const createProduct = (data) => {
      const brand = data.brandName;
      const name = data.description;
      const sku = data.partNumber;
      const image = data.primaryMedia.absoluteUrl.replace("http:", "https:");
      const stock = data.inventory.locales.reduce(
        (total, local) => total + (local.quantity || 0),
        0
      );
      const price =
        data.prices.retail ||
        data.prices.originalRetail ||
        data.prices.originalBase + data.prices.originalBase * 0.35;
      let addToCart;
      if (stock > 0) {
        addToCart = `<button data-event-type="product-click" class="ymm-product-link button card-figcaption-button" data-product-id="${sku}" tabindex="0">Add To Cart</button>`;
      } else {
        addToCart = `<button data-reveal-id="ask-an-expert" class="button card-figcaption-button" data-product-id="${sku}" tabindex="0">Ask An Expert</button>`;
      }

      return `
                <li class="product">
                  <article class="card" data-product-id="${sku}">
                  <div class="card-figure">
                      <img style="width: 100%; height: 285px; object-fit: contain;" src="${image}" alt="${name}"/>
                  </div>
                  <div class="card-body">
                    <p class="card-brand" data-test-info-type="brandName">${brand}</p>
                    <p class="card-sku">#${sku}</p>
                    <h4 class="card-title">
                    ${name}
                    </h4>
                    <div class="card-wrapper">
                    <span data-product-price-without-tax="" class="price price--withoutTax">$${price}</span>
                    </div>
                    <div class="card-figcaption">
                        ${addToCart}
                    </div>
                  </div>
                  </article>
                </li>
              `;
    };

    const getPagination = (page, totalPages) => {
      let prevPage = `
            <li class="pagination-item pagination-item--previous">
                <a id="prev-page" class="pagination-link" href="#" data-faceted-search-facet="">
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-slick-prev"></use>
                        </svg>
                    </i>
                    Previous
                </a>
            </li>
        `;
      let nextPage = `
            <li class="pagination-item pagination-item--next">
                <a id="next-page" class="pagination-link" href="#" data-faceted-search-facet="">
                    Next
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-slick-next"></use>
                        </svg>
                    </i>
                </a>
            </li>`;

      if (page == 0) {
        prevPage = "";
      }

      if (page + 1 == totalPages) {
        nextPage = "";
      }

      return `<ul class="pagination-list">${prevPage}${nextPage}</ul>`;
    };

    const onPageChanged = async (tiresSelected, page) => {
      await getTiresContent(tiresSelected, page);
    };

    const getTiresContent = async (tiresSelected, page) => {
      const products = await getTires(tiresSelected, page);
      const pagination = getPagination(page, totalPages);
      if (products) {
        tiresResultsContainer.innerHTML = `<ul class="productGrid">${products}</ul>${pagination}`;
        if (document.querySelector("#prev-page"))
          document
            .querySelector("#prev-page")
            .addEventListener("click", (e) => {
              onPageChanged(tiresSelected, page - 1);
            });
        if (document.querySelector("#next-page"))
          document
            .querySelector("#next-page")
            .addEventListener("click", (e) => {
              onPageChanged(tiresSelected, page + 1);
            });
      } else {
        tiresResultsContainer.innerHTML = `Not found!`;
      }
    };

    tiresResultsContainer.addEventListener("click", async (e) => {
      if (!e.target.classList.contains("ymm-product-link")) return;
      e.preventDefault();
      let productLink = e.target;
      const sku = productLink.dataset.productId;
      productLink.textContent = "Loading...";
      const response = await fetch(
        `https://warehouse.discountmotogear.com/external/product?sku=${sku}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();

        if (data.link) {
          productLink.textContent = "Added To Cart";
          productLink.disabled = true;
          window.location.href = data.link;
        }
        if (data.error) productLink.textContent = "Error.";
      }
    });

    getTiresContent(tiresSelected, page);

    tiresWidth.addEventListener("change", (e) => {
      const value = e.target.value;
      value.length ? (tiresSelected.width = value) : (tiresSelected.width = "");
      getTiresContent(tiresSelected, page);
    });
    tiresAspectRatio.addEventListener("change", (e) => {
      const value = e.target.value;
      value.length
        ? (tiresSelected.aspectRatio = value)
        : (tiresSelected.aspectRatio = "");
      getTiresContent(tiresSelected, page);
    });
    tiresRimDiameter.addEventListener("change", (e) => {
      const value = e.target.value;
      value.length
        ? (tiresSelected.rimDiameter = value)
        : (tiresSelected.rimDiameter = "");
      getTiresContent(tiresSelected, page);
    });
    tiresMarketSegment.addEventListener("change", (e) => {
      const value = e.target.value;
      value.length
        ? (tiresSelected.segment = value)
        : (tiresSelected.segment = "");
      getTiresContent(tiresSelected, page);
    });
  })();
});
