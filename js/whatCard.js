const namesCard = {
  visa: "visa",
  mastercard: "mastercard",
  americanexpress: "americanexpress",
};

const { visa, mastercard, americanexpress } = namesCard;

const typeCard = {
  [visa]: ["4"],
  [mastercard]: ["51", "52", "53", "54", "55"],
  [americanexpress]: ["34", "37"],
};

const verifHowIsCardStart = (number, cardName) => {
  const numberCard = number.toString();
  for (const key in typeCard) {
    for (const numberStart of typeCard[key]) {
      const regNS = new RegExp(numberStart, "g");
      if (regNS.test(numberCard.slice(0, numberStart.length))) {
        return key === cardName.toLowerCase();
      }
    }
  }
};

const makeReverseArrayfromString = (text) => text.split("").reverse();

const sumFromString = (NumbersString) => {
  return NumbersString.split("").reduce((total, value) => {
    return (total += Number(value));
  }, 0);
};

const verificationLuhn = (number) => {
  const numberCard = number.toString();
  let beforeFirstOperation = "";
  let beforeSecondOperation = "";
  makeReverseArrayfromString(numberCard).forEach((number, index) => {
    if (index % 2 === 0) {
      beforeFirstOperation += number;
    } else {
      beforeSecondOperation += (Number(number) * 2).toString();
    }
  });
  let firstOperation = sumFromString(beforeFirstOperation);
  let secondOperation = sumFromString(beforeSecondOperation);

  return (firstOperation + secondOperation) % 10 === 0;
};

const verifLengthAndStart = (number) => {
  const numberCard = number.toString();
  if (numberCard.length === 15) {
    return verifHowIsCardStart(numberCard, americanexpress) && americanexpress;
  } else if (numberCard.length === 13) {
    return verifHowIsCardStart(numberCard, visa) && visa;
  } else if (numberCard.length === 16) {
    return verifHowIsCardStart(numberCard, visa) ? visa : mastercard;
  } else {
    return false;
  }
};

const writeName = (cardName) => {
  const card = cardName.toLowerCase();
  if (card === visa) {
    return "Visa";
  }
  if (card === mastercard) {
    return "Mastercard";
  }
  if (card === americanexpress) {
    return "American Express";
  }
};

const cleanNumberCard = (numberCard) => {
  const regOnlyNumber = /\D/g;
  return numberCard.replace(regOnlyNumber, "");
};

const verifNumberCard = (number) => {
  let numberCard = cleanNumberCard(number.toString());
  if (verificationLuhn(numberCard)) {
    for (const nameCard in namesCard) {
      const isVerificationLength = verifLengthAndStart(numberCard) === nameCard;
      if (isVerificationLength) {
        return writeName(nameCard);
      }
    }
  }
  return "Nieprawidłowy";
};

module.exports = verifNumberCard;
