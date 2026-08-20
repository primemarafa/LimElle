/**
 * Generate a unique key for a cart item based on product id, size, and color.
 */
export function cartKey(product) {
  return `${product.id}::${product.selectedSize ?? "Unique"}::${product.selectedColor ?? "Standard"}`;
}
