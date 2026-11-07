// @ts-nocheck
import { describe, it, expect } from "vitest";
import {
  calculateSkills,
  calculateValues,
  getDominantColor,
  getHeroRole,
  isUnknownValue,
  getCompareLink,
  parseMeasurement,
  toCentimeters,
  getColorSwatch,
  getMatchup,
  matchesRosterSearch,
  parseCompareIds,
} from "./hero";

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

describe("getHeroRole", () => {
  it("uses the occupation, or the side when there is none", () => {
    const biography = { alignment: "bad" };
    expect(getHeroRole({ work: { occupation: "Spy" }, biography })).toBe("Spy");
    expect(getHeroRole({ work: { occupation: "-" }, biography })).toBe(
      "Villain"
    );
    expect(
      getHeroRole({
        work: { occupation: "" },
        biography: { alignment: "good" },
      })
    ).toBe("Hero");
  });
});

describe("isUnknownValue", () => {
  it.each([undefined, null, "", " - ", "0 cm", "0 kg"])(
    "treats %s as unknown",
    (value) => expect(isUnknownValue(value)).toBe(true)
  );
  it.each(["Human", "170 cm", "10 tons"])("treats %s as known", (value) =>
    expect(isUnknownValue(value)).toBe(false)
  );
});

describe("getCompareLink", () => {
  it("lists the ids in the query string", () => {
    expect(getCompareLink(["1", "2"])).toBe("/herodex/compare?ids=1,2");
  });
});

describe("parseMeasurement", () => {
  it("splits value and unit", () => {
    expect(parseMeasurement("1,203 cm")).toEqual({
      value: "1,203",
      unit: "cm",
      amount: 1203,
    });
    expect(parseMeasurement("61.0 meters")).toEqual({
      value: "61.0",
      unit: "meters",
      amount: 61,
    });
  });

  it("returns null for unknown values", () => {
    expect(parseMeasurement("0 cm")).toBeNull();
    expect(parseMeasurement("-")).toBeNull();
    expect(parseMeasurement(undefined)).toBeNull();
  });
});

describe("toCentimeters", () => {
  it("converts metres and keeps centimetres", () => {
    expect(toCentimeters(170, "cm")).toBe(170);
    expect(toCentimeters(15.2, "meters")).toBeCloseTo(1520);
    expect(toCentimeters(3, "tons")).toBeNull();
  });
});

describe("getColorSwatch", () => {
  it("maps colour names, ignoring case and notes", () => {
    expect(getColorSwatch("Green")).toBe("#3FBF6B");
    expect(getColorSwatch("blue")).toBe("#3D7BE0");
    expect(getColorSwatch("Yellow (without irises)")).toBe("#F2C94C");
  });

  it("splits two-tone colours", () => {
    expect(getColorSwatch("Brown / White")).toBe(
      "linear-gradient(90deg, #7A4A2A 50%, #F2F4F7 50%)"
    );
  });

  it("returns null for unknown or missing colours", () => {
    expect(getColorSwatch("No Hair")).toBeNull();
    expect(getColorSwatch("-")).toBeNull();
  });
});

describe("compare helpers", () => {
  test("parseCompareIds keeps unique ids up to the compare limit", () => {
    expect(parseCompareIds("1, 2,2,,3,4,5")).toEqual(["1", "2", "3", "4"]);
    expect(parseCompareIds(null)).toEqual([]);
  });

  test("getMatchup follows the battle rule", () => {
    // attack reaches defence and defence stays above attack
    expect(
      getMatchup({ attack: 4, defense: 5 }, { attack: 4, defense: 4 })
    ).toBe("win");
    expect(
      getMatchup({ attack: 4, defense: 4 }, { attack: 4, defense: 5 })
    ).toBe("lose");
    // both cards fall: nobody wins
    expect(
      getMatchup({ attack: 5, defense: 2 }, { attack: 5, defense: 2 })
    ).toBe("draw");
  });

  test("matchesRosterSearch looks at name, role and aliases", () => {
    const hero = { name: "Black Widow", role: "Spy", aliases: ["Natasha"] };

    expect(matchesRosterSearch(hero, "  WIDOW ")).toBe(true);
    expect(matchesRosterSearch(hero, "spy")).toBe(true);
    expect(matchesRosterSearch(hero, "natasha")).toBe(true);
    expect(matchesRosterSearch(hero, "")).toBe(true);
    expect(matchesRosterSearch(hero, "hulk")).toBe(false);
  });
});
