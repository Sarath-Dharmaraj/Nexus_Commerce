// Sku ID generator function

export function generateSKu(skuTitle) {
  const prefix = "NX";

  const random_number = Math.floor(1000 + Math.random() * 9000);
  const words = skuTitle.trim().split(/[\s-]+/);

  let suffix;

  if (words.length === 1) {
    suffix = words[0].substring(0, 2).padEnd(2, "X").toUpperCase();
  } else {
    suffix = words[0][0] + words[1][0];
    suffix = suffix.toUpperCase();
  }

  return `${prefix}-${random_number}-${suffix}`;
}

// product id generator
export function generateCode() {
  const prefix = "#NXS";

  const random_number = Math.floor(10000 + Math.random() * 90000);

  return `${prefix}-${random_number}`;
}
