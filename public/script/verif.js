const formCard = document.getElementById("formCard");
const yourCardIs = document.getElementById("yourCardIs");
const sendNumber = (number) => {
  axios
    .post(`${document.baseURI}card`, { number })
    .then((response) => {
      yourCardIs.innerHTML = response.data;
    })
    .catch((error) => console.error(error));
};
formCard.addEventListener("submit", (e) => {
  e?.preventDefault();
  sendNumber(e.target[0].value);
});
