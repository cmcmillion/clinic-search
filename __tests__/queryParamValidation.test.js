import {
  validateName,
  validateState,
  validateTime,
} from "../middleware/queryParamValidation.js";

describe("Custom Validator Functions", () => {
  describe("validateName", () => {
    it("should pass validation for a valid name", () => {
      expect(() => validateName("John Doe")).not.toThrow();
    });

    it("should throw an error for an invalid name", () => {
      expect(() => validateName("John1")).toThrow(
        "Invalid query parameter: name parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
      );
    });
    it("should throw an error for an empty name", () => {
      expect(() => validateName("")).toThrow(
        "Invalid query parameter: name parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
      );
    });
  });

  describe("validateState", () => {
    it("should pass validation for a valid state", () => {
      expect(() => validateState("New York")).not.toThrow();
    });

    it("should throw an error for an invalid state", () => {
      expect(() => validateState("!@#")).toThrow(
        "Invalid query parameter: state parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
      );
    });

    it("should throw an error for an empty state", () => {
      expect(() => validateState("")).toThrow(
        "Invalid query parameter: state parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
      );
    });
  });

  describe("validateTime", () => {
    it("should pass validation for a valid time", () => {
      expect(() => validateTime("09:30")).not.toThrow();
    });

    it("should throw an error for an invalid time", () => {
      expect(() => validateTime("99:99")).toThrow(
        "Invalid query parameter: to and from parameters must be in the format HH:MM, where HH is from 00 to 24 and MM is from 00 to 59"
      );
    });

    it("should throw an error for an invalid time format", () => {
      expect(() => validateTime("9:30")).toThrow(
        "Invalid query parameter: to and from parameters must be in the format HH:MM, where HH is from 00 to 24 and MM is from 00 to 59"
      );
    });

    it("should throw an error for an empty time", () => {
      expect(() => validateTime("")).toThrow(
        "Invalid query parameter: to and from parameters must be in the format HH:MM, where HH is from 00 to 24 and MM is from 00 to 59"
      );
    });
  });
});
