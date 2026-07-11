import { describe, expect, it } from "vitest";
import { formatCompactNumber, formatDateTime, formatMoney } from "./format";

describe("format helpers", () => {
  it("formats GBP values", () => {
    expect(formatMoney(250, "GBP")).toContain("250");
  });

  it("formats NGN values without decimals", () => {
    const value = formatMoney(457000, "NGN");
    expect(value).toContain("457");
    expect(value).not.toContain(".00");
  });

  it("formats compact number", () => {
    expect(formatCompactNumber(15200).toLowerCase()).toContain("k");
  });

  it("formats datetime text", () => {
    const value = formatDateTime("2026-07-11T10:00:00.000Z");
    expect(value.length).toBeGreaterThan(0);
  });
});
