export function createProductRepository(db) {
  return {
    async findAll() {
      const { rows } = await db.query(
        `SELECT id, name, description, price, weight, category, size, color, stock, availability, image_url AS "imageUrl"
         FROM products ORDER BY created_at DESC`,
      );
      return rows;
    },

    async findById(id) {
      const { rows } = await db.query(
        `SELECT id, name, description, price, weight, category, size, color, stock, availability, image_url AS "imageUrl"
         FROM products WHERE id = $1`,
        [id],
      );
      return rows[0] ?? null;
    },

    async create(product) {
      const { rows } = await db.query(
        `INSERT INTO products
          (id, name, description, price, weight, category, size, color, stock, availability, image_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING id, name, description, price, weight, category, size, color, stock, availability, image_url AS "imageUrl"`,
        [
          product.id,
          product.name,
          product.description ?? "",
          product.price,
          product.weight,
          product.category,
          product.size ?? null,
          product.color ?? null,
          product.stock ?? 0,
          product.availability ?? "DISPONIBLE",
          product.imageUrl ?? null,
        ],
      );
      return rows[0];
    },

    async update(id, product) {
      const { rows } = await db.query(
        `UPDATE products
         SET name=$2, description=$3, price=$4, weight=$5, category=$6, size=$7, color=$8,
             stock=$9, availability=$10, image_url=$11, updated_at=NOW()
         WHERE id=$1
         RETURNING id, name, description, price, weight, category, size, color, stock, availability, image_url AS "imageUrl"`,
        [
          id,
          product.name,
          product.description ?? "",
          product.price,
          product.weight,
          product.category,
          product.size ?? null,
          product.color ?? null,
          product.stock ?? 0,
          product.availability ?? "DISPONIBLE",
          product.imageUrl ?? null,
        ],
      );
      return rows[0] ?? null;
    },

    async delete(id) {
      const result = await db.query("DELETE FROM products WHERE id = $1", [id]);
      return result.rowCount > 0;
    },
  };
}
