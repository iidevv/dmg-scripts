document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("#ymm-results")) return;
  // page template
  // <div id="ymm-results">
  //     <div class="ymm-filters"></div>
  //     <div class="ymm-products"></div>
  // </div>

  (async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const ymmResults = document.querySelector("#ymm-results");
    const ymmFilters = document.querySelector("#ymm-results .ymm-filters");
    const ymmProducts = document.querySelector("#ymm-results .ymm-products");

    const hash = urlParams.get("hash");
    const year = urlParams.get("year");
    const make = urlParams.get("make");
    const model = urlParams.get("model");
    let page = 0;
    let totalPages = 0;
    const pageTitle = document.querySelector(".page-heading");
    pageTitle.textContent = `Search Results for: ${year} - ${make} ${model}`;

    ymmResults.addEventListener("click", async (e) => {
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

    const getProducts = async (hash, search, page) => {
      try {
        const offset = page * 20;
        const payload = {
          queryString: search,
          filters: [
            {
              operator: "OR",
              matches: [
                {
                  parameters: {
                    precision: "exact",
                  },
                  type: "fitmentPrecision",
                  valueMatchMethod: "EXACT",
                },
              ],
            },
            {
              operator: "OR",
              matches: [
                {
                  path: "fitments",
                  values: [hash],
                },
              ],
            },
          ],
          pagination: {
            limit: 20,
            offset: offset,
          },
        };
        const response = await fetch(
          "https://www.parts-unlimited.com/api/parts/search",
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

    const onPageChanged = async (hash, page) => {
      const search = document.querySelector("#ymm-search-input").value;
      await getYmmContent(hash, search, page);
    };

    const getSearchResults = async (hash, search, page) => {
      if (search.length > 2) await getYmmContent(hash, search, page);
      if (search.length == 0) await getYmmContent(hash, search, page);
    };

    const getYmmContent = async (hash, search, page) => {
      const products = await getProducts(hash, search, page);
      const pagination = getPagination(page, totalPages);
      if (products) {
        ymmProducts.innerHTML = `<ul class="productGrid">${products}</ul>${pagination}`;
        if (document.querySelector("#prev-page"))
          document
            .querySelector("#prev-page")
            .addEventListener("click", (e) => {
              onPageChanged(hash, page - 1);
            });
        if (document.querySelector("#next-page"))
          document
            .querySelector("#next-page")
            .addEventListener("click", (e) => {
              onPageChanged(hash, page + 1);
            });
      } else {
        ymmProducts.innerHTML = `Not found!`;
      }
    };

    const ymmSearch = `<input id="ymm-search-input" placeholder="Enter part name or number..."/>`;
    ymmFilters.innerHTML = ymmSearch;
    document
      .querySelector("#ymm-search-input")
      .addEventListener("input", (e) => {
        getSearchResults(hash, e.target.value, page);
      });

    getYmmContent(hash, "", page);
  })();
});
