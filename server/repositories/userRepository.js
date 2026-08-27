import crypto from "node:crypto";

export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function verifyPassword(password, salt, storedHash) {
  const hash = hashPassword(password, salt);
  const hashBuffer = Buffer.from(hash, "hex");
  const storedBuffer = Buffer.from(storedHash, "hex");
  if (hashBuffer.length !== storedBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, storedBuffer);
}

export function createUserRepository(db = null) {
  const memoryUsers = new Map();
  let memoryIdSeq = 1;

  return {
    async create({ email, password, fullName, phone = "", city = "" }) {
      const normalizedEmail = email.trim().toLowerCase();
      const salt = generateSalt();
      const passwordHash = hashPassword(password, salt);

      if (!db) {
        if ([...memoryUsers.values()].some((u) => u.email === normalizedEmail)) {
          const err = new Error("Cet email est déjà utilisé");
          err.code = "23505";
          throw err;
        }
        const id = memoryIdSeq++;
        const user = {
          id,
          email: normalizedEmail,
          passwordHash,
          salt,
          fullName,
          phone,
          city,
          createdAt: new Date().toISOString(),
        };
        memoryUsers.set(id, user);
        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          city: user.city,
          createdAt: user.createdAt,
        };
      }

      const { rows } = await db.query(
        `INSERT INTO users (email, password_hash, salt, full_name, phone, city)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, full_name AS "fullName", phone, city, created_at AS "createdAt"`,
        [normalizedEmail, passwordHash, salt, fullName, phone, city],
      );
      return rows[0];
    },

    async findByEmail(email) {
      const normalizedEmail = email.trim().toLowerCase();

      if (!db) {
        const found = [...memoryUsers.values()].find((u) => u.email === normalizedEmail);
        return found ?? null;
      }

      const { rows } = await db.query(
        `SELECT id, email, password_hash AS "passwordHash", salt, full_name AS "fullName", phone, city, created_at AS "createdAt"
         FROM users
         WHERE LOWER(email) = $1`,
        [normalizedEmail],
      );
      return rows[0] ?? null;
    },

    async findById(id) {
      if (!db) {
        const user = memoryUsers.get(Number(id));
        if (!user) return null;
        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          city: user.city,
          createdAt: user.createdAt,
        };
      }

      const { rows } = await db.query(
        `SELECT id, email, full_name AS "fullName", phone, city, created_at AS "createdAt"
         FROM users
         WHERE id = $1`,
        [id],
      );
      return rows[0] ?? null;
    },

    async findOrdersByUserId(userId) {
      if (!db) return [];
      const { rows } = await db.query(
        `SELECT o.id, o.reference, o.lookup_token AS "lookupToken", o.status, o.delivery_mode AS "deliveryMode",
                o.delivery_address AS "deliveryAddress", o.notes, o.product_total AS "productTotal",
                o.weight, o.transport, o.total, o.created_at AS "createdAt"
         FROM orders o
         WHERE o.user_id = $1
         ORDER BY o.created_at DESC`,
        [userId],
      );
      return rows;
    },
  };
}
