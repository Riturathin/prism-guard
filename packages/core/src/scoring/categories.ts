export enum Category {
    Architecture = "architecture",
    Performance = "performance",
    Maintainability = "maintainability",
    Accessibility = "accessibility"
  }
  
  export const CATEGORY_WEIGHT: Record<Category, number> = {
    [Category.Architecture]: 0.35,
    [Category.Performance]: 0.30,
    [Category.Maintainability]: 0.25,
    [Category.Accessibility]: 0.10
  };