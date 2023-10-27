let coins = [];

const table = document.getElementById("table");
let searchBar = document.getElementsByTagName("input");
searchBar = searchBar[0];
const tableMobile = document.getElementsByClassName("table_m")[0];

searchBar.oninput = (event) => {
  Array.from(document.getElementsByClassName("coinrow")).forEach((element) => {
    element.remove();
  });

  Array.from(document.getElementsByClassName("coin_m")).forEach((element) => {
    element.remove();
  });
  // console.log(coins);
  coins
    .filter((coin) => {
      return coin.name
        .toUpperCase()
        .startsWith(event.target.value.toUpperCase());
    })
    .forEach((coin) => {
      createRow(coin);
    });
};

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
)
  .then((res) => {
    res.json().then((dataServer) => {
      coins = dataServer;
      //console.log(dataServer);
      dataServer.forEach((coin) => {
        createRow(coin);
      });
    });
  })
  .catch((error) => {
    alert("Please check your internet connection");
  });

function createRow(coin) {
  const row = document.createElement("tr");
  row.className = "coinrow";
  //console.log("flflfl");
  table.appendChild(row);
  row.innerHTML = `
    <td class="coinname"><img src=${coin.image} alt="" />${coin.name}</td>
          <td>$${coin.current_price}</td>
          <td class=${
            coin.price_change_percentage_24h < 0 ? "red24" : "green24"
          }>${coin.price_change_percentage_24h.toFixed(2)}%</td>

          <td>${coin.total_volume}</td>
          <td>$${coin.market_cap}</td>
    `;

  const rowMobile = document.createElement("div");
  rowMobile.className = "coin_m";
  tableMobile.appendChild(rowMobile);
  rowMobile.innerHTML = `
					<div class="coinname_m">
						<img src=${coin.image} alt="">
						${coin.name}
					</div>
					<div class="price24_m">
						<p>$${coin.current_price}</p>
						<p class=
            ${
              coin.price_change_percentage_24h < 0
                ? "red24 textsmall_m"
                : "green24 textsmall_m"
            } 
            >${coin.price_change_percentage_24h.toFixed(2)}%</p>
					</div>
					<div class="volumecap_m">
						<p >${coin.total_volume}</p>
						<p class="textsmall_m" style="color: grey;">$${coin.market_cap}</p>
					</div>
				`;
}

/* <tr class="coinrow">
          <td class="coinname"><img src="Assets/bitcoin.svg" alt="" />Bitcoin</td>
          <td>$286876</td>
          <td class="green24">0.46%</td>

          <td>$229629682</td>
          <td>$293466536</td>
        </tr> */
