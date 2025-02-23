export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces or hyphens
};