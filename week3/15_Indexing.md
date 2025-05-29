# Indexing
- It creates a lookup table with the column and the pointer to the memory location of the row, containing this column

- eg. we have a table like 
```sql
 cust_id | cust_name | ord_id | ord_date   | price  | cust_id 
---------+-----------+--------+------------+--------+---------
       1 | Raju      |      1 | 2024-01-01 | 250.00 |       1
       2 | Sham      |      1 | 2024-01-01 | 450.00 |       1
       3 | Paul      |      1 | 2024-01-01 | 100.00|        |
       . . .
(1000000 rows)
```

- We run a query **SELECT * FROM table where price = 100;** Now this where query will look in the price column one by one but suppose it data lies in 100000th row, then this take too much time 
- so we use indexing in which a new table formed in memory with price column in sorted order and other column pointer which points to the row . Now we as it is sorted , we can apply binary search which reduces time complexity 

- Data sturucture used for this separte location in memory is B-trees

- B-trees data structures is used to store the indexing as it is a mulitlevel format of tree-based indexing, which has balanced binary search trees.

- We have to apply indexing on read - intensive application means if we have many read queries in our application then we have to apply indexing

- we don't have to apply indexing on write - intensive application because in write, time complexity for writing will also be there and then separte memory form due to indexing also increase the time . so overall timecomplexity increases.


Indexing in **PostgreSQL** (or **Postgres**) is a fundamental database performance optimization technique. It allows the database engine to locate and retrieve rows much faster than scanning the entire table. Below is a structured explanation of indexing in Postgres, from basic concepts to advanced techniques.

---

## 🔹 **1. What Is an Index? (Basic)**

An **index** is a data structure (commonly a B-tree) that improves the speed of data retrieval operations on a table at the cost of additional space and slower writes (INSERT, UPDATE, DELETE).

**Analogy:** Like an index in a book — instead of reading every page, you look up the topic and jump directly to the right page.

---

## 🔹 **2. Creating a Basic Index**

```sql
CREATE INDEX index_name ON table_name (column_name);
```

**Example:**

```sql
CREATE INDEX idx_users_email ON users (email);
```

Now, queries like `SELECT * FROM users WHERE email = 'john@example.com';` are much faster.

---

## 🔹 **3. Types of Indexes (Intermediate)**

### 🟢 **B-tree Index (Default)**

* Used for equality and range queries (`=`, `<`, `<=`, `>`, `>=`, `BETWEEN`)
* Most commonly used

```sql
CREATE INDEX idx_name ON table (column);
```

### 🟡 **Hash Index**

* Only supports equality comparisons (`=`)
* Rarely used; mostly replaced by B-tree

```sql
CREATE INDEX idx_hash ON table USING hash (column);
```

### 🔵 **GIN (Generalized Inverted Index)**

* Great for indexing array, `tsvector`, and JSONB columns
* Used in full-text search

```sql
CREATE INDEX idx_gin ON articles USING gin (to_tsvector('english', content));
```

### 🔴 **GiST (Generalized Search Tree)**

* Supports more complex data types: geometric types, full-text, range types

```sql
CREATE INDEX idx_gist ON geo_data USING gist (location);
```

### 🟣 **SP-GiST (Space-partitioned GiST)**

* Useful for non-balanced data like IP ranges

---

## 🔹 **4. Unique Index**

Enforces uniqueness and acts like a constraint.

```sql
CREATE UNIQUE INDEX idx_unique_email ON users (email);
```

---

## 🔹 **5. Composite Indexes**

Index on multiple columns — useful when you filter or sort on multiple columns.

```sql
CREATE INDEX idx_multi ON orders (customer_id, order_date);
```

**Note:** Order matters! Index can be used for:

* `WHERE customer_id = ?`
* `WHERE customer_id = ? AND order_date = ?`
  But **not** for: `WHERE order_date = ?`

---

## 🔹 **6. Expression Indexes**

Indexes based on computed values.

```sql
CREATE INDEX idx_lower_email ON users (LOWER(email));
```

Useful when queries involve functions:

```sql
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';
```

---

## 🔹 **7. Partial Indexes**

Index a subset of rows — reduces size and improves performance.

```sql
CREATE INDEX idx_active_users ON users (last_login) WHERE is_active = true;
```

Only useful if your queries match the condition.

---

## 🔹 **8. Covering Index (INCLUDE clause)**

Adds extra columns to the index for **index-only scans**.

```sql
CREATE INDEX idx_order_date_include ON orders (order_date) INCLUDE (total_amount);
```

This avoids accessing the table if the query only needs indexed columns.

---

## 🔹 **9. Index Maintenance & Monitoring**

* Indexes **slow down** writes (INSERT/UPDATE/DELETE)
* Periodically **REINDEX** or **VACUUM ANALYZE** for maintenance
* Use `pg_stat_user_indexes` to find unused indexes

```sql
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;
```

---

## 🔹 **10. Advanced: Custom Index Types & Extensions**

### 🔸 **BRIN (Block Range Indexes)**

* For large tables where data is naturally ordered (e.g., timestamps)
* Much smaller and faster to create

```sql
CREATE INDEX idx_brin_logs ON logs USING brin (log_time);
```

### 🔸 **pg\_trgm (Trigram Index)**

* For fuzzy search / LIKE '%text%' patterns

```sql
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_trgm ON products USING gin (name gin_trgm_ops);
```

---

## 🔹 **11. How PostgreSQL Uses Indexes**

* PostgreSQL query planner automatically chooses whether to use an index
* Use `EXPLAIN ANALYZE` to see if your query uses an index

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@example.com';
```

---

## 🧠 Best Practices

| Tip                                        | Description                                    |
| ------------------------------------------ | ---------------------------------------------- |
| 🔍 Index frequently queried columns        | Especially in `WHERE`, `JOIN`, `ORDER BY`      |
| ⚖️ Don’t over-index                        | Too many indexes can hurt write performance    |
| 🧪 Use `EXPLAIN ANALYZE`                   | Always test if the index is being used         |
| 🎯 Consider partial and expression indexes | For specific filtering or computed values      |
| 🧹 Clean unused indexes                    | Monitor and remove indexes with `idx_scan = 0` |

---

Would you like a visual cheat sheet or example queries to test these index types in a sample database?
