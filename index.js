let shop = document.getElementById("shop");

let shopItemData = [
  {
    id: "casual",
    name: "Casual Shirt",
    price: 45,
    desc: "lorem sdfasdfasdf",
    img: "images/img-1.jpg",
  },
  {
    id: "office",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem hdiasdijd dajdljsidfj sdajdoi skldjoas",
    img: "images/img-2.jpg",
  },
  {
    id: "tshirt",
    name: "T-Shirt",
    price: 25,
    desc: "Lorem hdiasdijd dajdljsidfj sdajdoi skldjoas",
    img: "images/img-3.jpg",
  },
  {
    id: "mens",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem hdiasdijd dajdljsidfj sdajdoi skldjoas",
    img: "images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => id === x.id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img src="${img}" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrease(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick="increase(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increase = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

let decrease = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.textContent = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
