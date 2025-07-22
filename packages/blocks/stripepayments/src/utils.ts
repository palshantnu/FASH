// Customizable Area Start
export const expiryDateMask = (text = "") => {
  const cleanText = text.replace(/\D+/g, "");

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(0) === "0") {
    secondDigitMonthMask = /[1-9]/;
  }

  if (cleanText.charAt(0) === "1") {
    secondDigitMonthMask = /[012]/;
  }

  return [/[0-1]/, secondDigitMonthMask, "/", /\d/, /\d/, /\d/, /\d/];
};
// Customizable Area End
