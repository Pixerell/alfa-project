export type FieldErrors = Partial<
  Record<"title" | "price" | "description" | "category" | "image", string>
>;

const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

export const validateTitle = (v: string): string => {
  if (!v.trim()) return "Title is required";
  if (v.trim().length < 3) return "Title must be at least 3 characters";
  return "";
};

export const validatePrice = (v: string): string => {
  const trimmed = v.trim();
  if (!trimmed) return "Price is required";
  if (!PRICE_REGEX.test(trimmed))
    return "Price must be a number with up to 2 decimals (e.g. 9.99)";

  const num = parseFloat(trimmed);
  if (num < 0) return "Price must be a positive number";
  return "";
};

export const validateCategory = (v: string): string => {
  if (!v.trim()) return "Category is required";
  if (v.trim().length < 2) return "Category must be at least 2 characters";
  return "";
};

// Описание опционально

export const validateImage = (v: string): string => {
  const trimmed = v.trim();
  if (!trimmed || trimmed.startsWith("data:")) return "";

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:"
      ? ""
      : "Image must be a http(s) URL or a data URL";
  } catch {
    return "Image must be a valid URL";
  }
};

export const validateAll = (values: Record<string, string>): FieldErrors => {
  const validators: Record<string, (v: string) => string> = {
    title: validateTitle,
    price: validatePrice,
    category: validateCategory,
    image: validateImage,
  };
  const errors: FieldErrors = {};
  for (const key in validators) {
    const err = validators[key](values[key] ?? "");
    if (err) errors[key as keyof FieldErrors] = err;
  }
  return errors;
};
