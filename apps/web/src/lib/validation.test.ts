import { describe, expect, it } from "vitest";
import { getEmailError, getPasswordError, getRequiredError } from "./validation";

describe("getEmailError", () => {
  it("requires a value", () => {
    expect(getEmailError("")).toBe("Email is required.");
    expect(getEmailError("   ")).toBe("Email is required.");
  });

  it("rejects malformed emails", () => {
    expect(getEmailError("not-an-email")).toBe("Enter a valid email address.");
    expect(getEmailError("missing@domain")).toBe("Enter a valid email address.");
  });

  it("accepts a valid email", () => {
    expect(getEmailError("you@domain.com")).toBeUndefined();
  });
});

describe("getPasswordError", () => {
  it("requires a value", () => {
    expect(getPasswordError("")).toBe("Password is required.");
  });

  it("enforces the minimum length", () => {
    expect(getPasswordError("short")).toBe("Use at least 8 characters.");
    expect(getPasswordError("ab", 4)).toBe("Use at least 4 characters.");
  });

  it("accepts a password meeting the minimum length", () => {
    expect(getPasswordError("longenough")).toBeUndefined();
  });
});

describe("getRequiredError", () => {
  it("requires a non-empty value", () => {
    expect(getRequiredError("", "Full name")).toBe("Full name is required.");
    expect(getRequiredError("   ", "Full name")).toBe("Full name is required.");
  });

  it("accepts a non-empty value", () => {
    expect(getRequiredError("Precious David", "Full name")).toBeUndefined();
  });
});
