const form = document.querySelector("#searchForm");
const res = document.querySelector("#tableResult");
var upd;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }
  const ctype = form.elements.coinType.value;
  fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
  const r = await axios.get(
    `https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`
  );
  console.log(r);
  const price = r.data.coin.price;
  const volume = r.data.coin.volume;
  const priceChange = r.data.coin.priceChange1d;
  const base = r.data.coin.name;

  res.innerHTML = `<tr style="background-color:blue; color:white; font-weight:700">
  <td >
    Property
  </td>
  <td>
    Value
  </td>
</tr>
<tr style="color:white">
  <td>
   ${base}
  </td>
  <td >
  ${price} 
  </td>
</tr>
<tr style="color:white">
  <td>
    Volume
  </td>
  <td>
  ${volume}
  </td>
</tr>
<tr style="color:white">
  <td>
   Change
  </td>
  <td>
  ${priceChange}
  </td>
</tr>
`;

  upd = setTimeout(() => fetchPrice(ctype), 10000);
};
