// utils/sortHelpers.ts
export type SortOrder = 'age-asc' | 'age-desc';

export const sortGrades = (grades: any[], order: SortOrder) => {
  return [...grades].sort((a, b) => {
    if (order === 'age-asc') {
      return a.age - b.age; // Kindergarten first
    } else {
      return b.age - a.age; // Grade 8 first
    }
  });
};