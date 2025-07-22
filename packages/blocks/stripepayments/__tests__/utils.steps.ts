import * as utils from "../src/utils";

describe("Utils", () => {
  describe("expiryDateMask", () => {
    it("should return the correct maskArray when the first number is 0", () => {
      const maskArray = utils.expiryDateMask("022334");

      expect(maskArray).toStrictEqual([
        /[0-1]/,
        /[1-9]/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]);
    });

    it("should return the correct maskArray when the first number is 1", () => {
      const maskArray = utils.expiryDateMask("122134");

      expect(maskArray).toStrictEqual([
        /[0-1]/,
        /[012]/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]);
    });

    it("should return the default maskArray when called without any params", () => {
      const maskArray = utils.expiryDateMask();

      expect(maskArray).toStrictEqual([
        /[0-1]/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]);
    });
  });
});
