// @ts-nocheck
import { describe, it, expect } from "vitest";
import { calculateSkills, calculateValues, getDominantColor } from "./hero";

describe("calculateValues", () => {
  it("normalizes skill values", () => {
    const skills = {
      attackPower: 60,
      acuracy: 72,
      defenseRating: 76,
      evasion: 73,
      attackSpeed: 66,
      survival: 73,
    };

    const result = calculateValues(skills);

    expect(result).toEqual({
      attack: 5, // ((60 + 66) / 20) * (72 / 100)
      defense: 5, // ((76 + 73) / 20) * (73 / 100)
    });
  });
});

describe("calculateSkills", () => {
  it("calculates offense and defense correctly", () => {
    const stats = {
      intelligence: 80,
      strength: 70,
      speed: 50,
      durability: 90,
      power: 60,
      combat: 90,
    };

    const result = calculateSkills(stats);

    expect(result).toEqual({
      attackPower: 73, // (70 + 90 + 60) / 3
      acuracy: 72, // (80 * 90) / 100
      defenseRating: 77, // (90 + 90 + 50) / 3
      evasion: 73, // (50 + 90 + 80) / 3
      attackSpeed: 67, // (50 + 60 + 90) / 3
      survival: 87, // (90 + 80 + 90) / 3
    });
  });
});

describe("getDominantColor", () => {
  const mockImageData = new Uint8ClampedArray([
    255,
    0,
    0,
    255, // red
    255,
    0,
    0,
    255, // red
    0,
    255,
    0,
    255, // green
    0,
    0,
    255,
    255, // blue
  ]);

  const mockCanvas = {
    width: 0,
    height: 0,
    getContext: vi.fn().mockReturnValue({
      drawImage: vi.fn(),
      getImageData: vi.fn().mockReturnValue({ data: mockImageData }),
    }),
  };

  beforeEach(() => {
    global.Image = class {
      onload!: () => void;
      onerror!: () => void;
      crossOrigin = "";
      set src(_) {
        setTimeout(() => this.onload(), 0);
      }
    };

    vi.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "canvas") return mockCanvas as any;
      return document.createElement(tagName);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the dominant color from image", async () => {
    const color = await getDominantColor("fake-url");
    expect(color).toBe("rgb(255,0,0)"); // red is dominant (2/4 pixels)
  });

  it("should reject if image fails to load", async () => {
    global.Image = class {
      onload!: () => void;
      onerror!: () => void;
      crossOrigin = "";
      set src(_) {
        setTimeout(() => this.onerror(), 0);
      }
    };

    await expect(getDominantColor("bad-url")).rejects.toThrow(
      "Failed to load image"
    );
  });
});
