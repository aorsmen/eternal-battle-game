import { PowerStatType, SkillsType, HeroValuesType } from "../types/main.types";
import { heroSkillModel } from "../config/hero";

export const calculateSkills = (stats: PowerStatType): SkillsType => {
  const { intelligence, combat, strength, power, durability, speed } = stats;
  const attackPower = Math.round((strength + combat + power) / 3);
  const acuracy = Math.round((intelligence * combat) / 100);
  const defenseRating = Math.round((durability + combat + speed) / 3);
  const evasion = Math.round((speed + combat + intelligence) / 3);
  const attackSpeed = Math.round((speed + power + combat) / 3);
  const survival = Math.round((durability + intelligence + combat) / 3);

  return {
    ...heroSkillModel,
    attackPower,
    acuracy,
    attackSpeed,
    defenseRating,
    evasion,
    survival,
  };
};

export const calculateValues = (skills: SkillsType): HeroValuesType => {
  const {
    attackPower,
    attackSpeed,
    acuracy,
    defenseRating,
    survival,
    evasion,
  } = skills;
  const attack = Math.round(
    ((attackPower + attackSpeed) / 20) * (acuracy / 100)
  );
  const defense = Math.round(
    ((defenseRating + evasion) / 20) * (survival / 100)
  );

  return { attack, defense };
};

export const getDominantColor = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const colorCounts: { [key in string]: number } = {};
        let maxCount = 0;
        let dominantColor = "#000000";

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const color = `rgb(${r},${g},${b})`;

          colorCounts[color] = (colorCounts[color] || 0) + 1;
          if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color];
            dominantColor = color;
          }
        }

        resolve(dominantColor);
      }
    };

    img.onerror = () => reject(new Error("Failed to load image"));
  });
};
