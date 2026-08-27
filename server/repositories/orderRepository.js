export function createOrderRepository(db) {
  return {
    async create(order) {
      const client = await db.connect();
      try {
        await client.query("BEGIN");

        const customerResult = await client.query(
          `INSERT INTO customers (full_name, phone, city)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [order.customer.fullName, order.customer.phone, order.customer.city],
        );
        const customerId = customerResult.rows[0].id;

        const orderResult = await client.query(
          `INSERT INTO orders
            (reference, lookup_token, customer_id, user_id, status, delivery_mode, delivery_address, notes,
             product_total, weight, transport, total)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
           RETURNING id, reference, lookup_token AS "lookupToken", status, delivery_mode AS "deliveryMode",
                     delivery_address AS "deliveryAddress", notes, product_total AS "productTotal",
                     weight, transport, total, created_at AS "createdAt"`,
          [
            order.reference,
            order.lookupToken,
            customerId,
            order.userId ?? null,
            order.status,
            order.deliveryMode,
            order.deliveryAddress,
            order.notes,
            order.totals.productTotal,
            order.totals.weight,
            order.totals.transport,
            order.totals.total,
          ],
        );
        const saved = orderResult.rows[0];

        for (const item of order.items) {
          await client.query(
            `INSERT INTO order_items
              (order_id, product_id, product_name, unit_price, unit_weight, quantity)
             VALUES ($1,$2,$3,$4,$5,$6)`,
            [
              saved.id,
              item.product.id,
              item.product.name,
              item.product.price,
              item.product.weight,
              item.quantity,
            ],
          );
        }

        await client.query("COMMIT");
        return { ...order, ...saved };
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        throw error;
      } finally {
        client.release();
      }
    },

    async findByLookupToken(lookupToken) {
      const { rows } = await db.query(
        `SELECT o.id, o.reference, o.lookup_token AS "lookupToken", o.status,
                o.delivery_mode AS "deliveryMode", o.delivery_address AS "deliveryAddress",
                o.notes, o.product_total AS "productTotal", o.weight, o.transport, o.total,
                o.created_at AS "createdAt",
                c.full_name AS "fullName", c.phone, c.city
         FROM orders o
         JOIN customers c ON c.id = o.customer_id
         WHERE o.lookup_token = $1`,
        [lookupToken],
      );
      if (!rows[0]) return null;

      const order = rows[0];
      const itemsResult = await db.query(
        `SELECT product_id AS "id", product_name AS name, unit_price AS price,
                unit_weight AS weight, quantity
         FROM order_items WHERE order_id = $1 ORDER BY id`,
        [order.id],
      );

      return {
        reference: order.reference,
        lookupToken: order.lookupToken,
        status: order.status,
        customer: { fullName: order.fullName, phone: order.phone, city: order.city },
        items: itemsResult.rows.map((item) => ({ product: { id: item.id, name: item.name, price: item.price, weight: item.weight }, quantity: item.quantity })),
        deliveryMode: order.deliveryMode,
        deliveryAddress: order.deliveryAddress,
        notes: order.notes,
        totals: { productTotal: order.productTotal, weight: order.weight, transport: order.transport, total: order.total },
        createdAt: order.createdAt,
      };
    },
  };
}
