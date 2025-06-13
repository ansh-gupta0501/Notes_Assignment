
## What is a Transaction in SQL?

A **transaction** is a sequence of one or more SQL operations (such as `INSERT`, `UPDATE`, `DELETE`, or `SELECT`) executed as a **single unit** of work.

---

### Key idea:

* Either **all operations in the transaction succeed** and their changes are permanently applied to the database,
* **or none of them do**, ensuring the database remains consistent even if something goes wrong.

---

## Why use transactions?

* To ensure **data integrity** and **consistency**, especially when multiple related changes must be treated as a single operation.
* To handle errors gracefully: if one step fails, all changes made in the transaction can be undone (rolled back).
* To prevent **partial updates** that could leave your data in an inconsistent state.

---

## Properties of Transactions — ACID

Transactions follow the **ACID** properties:

| Property        | Meaning                                                    |
| --------------- | ---------------------------------------------------------- |
| **Atomicity**   | All or nothing: either all operations succeed or none do.  |
| **Consistency** | The database moves from one valid state to another.        |
| **Isolation**   | Transactions don’t interfere with each other’s operations. |
| **Durability**  | Once committed, changes are permanent even after crashes.  |

---

## Basic SQL Transaction Commands

1. **BEGIN (or START TRANSACTION)**
   Marks the start of a transaction.

2. **COMMIT**
   Saves all changes made during the transaction permanently.

3. **ROLLBACK**
   Undoes all changes made during the transaction.

---

## Example:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

COMMIT;
```

* This transfers \$100 from user 1 to user 2.
* If either update fails, you can `ROLLBACK` so neither account is changed.

---

## What happens if there is an error?

If an error occurs during the transaction:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

-- Suppose this next query fails
UPDATE accounts SET balance = balance + 100 WHERE user_id = 999; -- user_id 999 doesn't exist

ROLLBACK;  -- Undo the first update, so no changes applied
```

---

## Transactions and Isolation Levels

Transactions can run at different **isolation levels** controlling how much one transaction is visible to others, balancing consistency and performance.

Common isolation levels:

* **READ UNCOMMITTED** — Lowest isolation, dirty reads possible.
* **READ COMMITTED** — Default in many DBs; no dirty reads, but non-repeatable reads possible.
* **REPEATABLE READ** — Prevents non-repeatable reads.
* **SERIALIZABLE** — Highest isolation, transactions appear to run serially.

---

## Summary:

* Transactions group multiple SQL operations into a single logical unit.
* They ensure all changes succeed or fail together.
* Use `BEGIN`, `COMMIT`, and `ROLLBACK` to control transaction boundaries.
* Follow ACID principles for reliable database operations.

---
Absolutely — let's break down **SQL transaction isolation levels** in detail, with examples and use cases.

---

## 🧠 What Are Transaction Isolation Levels?

In a database, **multiple transactions can run at the same time** (concurrency). **Isolation levels** define **how visible changes made by one transaction are to other concurrent transactions**.

Each level protects against certain kinds of problems called **anomalies**, such as:

* **Dirty reads**
* **Non-repeatable reads**
* **Phantom reads**

Higher isolation means more protection but also more locking and potential performance slowdown.

---

## 🪜 The Four Standard Isolation Levels (from weakest to strongest):

---

### 1. **READ UNCOMMITTED** (Lowest Isolation)

#### 🔍 What it allows:

* Transactions can **read data that hasn't been committed yet** by other transactions (called **dirty reads**).

#### ⚠️ Problems it allows:

* **Dirty reads**: You read uncommitted data that might be rolled back.
* **Non-repeatable reads**: Same query may return different results.
* **Phantom reads**: New rows can appear between reads.

#### 📌 Example:

Transaction A:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
-- (not committed yet)
```

Transaction B:

```sql
SELECT balance FROM accounts WHERE user_id = 1;  -- sees uncommitted data (dirty read)
```

If Transaction A rolls back, Transaction B saw a value that never truly existed.

#### 🧠 Use case:

* Rarely used in production; suitable only where data consistency is not important, like logging or caching.

---

### 2. **READ COMMITTED** (Default in PostgreSQL, SQL Server)

#### 🔍 What it allows:

* Can only read **committed data** from other transactions.
* Each query sees the **most recent committed version** of data.

#### ⚠️ Problems it prevents:

* ✅ Prevents **dirty reads**

#### ⚠️ Problems it allows:

* ❌ **Non-repeatable reads**: If you run the same query twice within the same transaction, you might get different results.
* ❌ **Phantom reads**: New rows matching a condition may appear.

#### 📌 Example:

Transaction A:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
COMMIT;
```

Transaction B:

```sql
BEGIN;
SELECT balance FROM accounts WHERE user_id = 1;  -- Gets latest committed value
UPDATE accounts SET balance = balance + 50 WHERE user_id = 1;
COMMIT;
```

Between two `SELECT`s, the balance may change due to another committed transaction.

#### 🧠 Use case:

* Good general-purpose level with decent consistency and performance.

---

### 3. **REPEATABLE READ** (Default in MySQL InnoDB)

#### 🔍 What it allows:

* Guarantees that if you read a row twice in the same transaction, **you’ll see the same data both times**, even if other transactions update it in between.
* Creates a **snapshot** at the start of the transaction.

#### ⚠️ Problems it prevents:

* ✅ Dirty reads
* ✅ Non-repeatable reads

#### ⚠️ Problems it allows:

* ❌ **Phantom reads**: New rows can be inserted by other transactions and appear in repeated queries.

#### 📌 Example:

Transaction A:

```sql
BEGIN;
SELECT * FROM orders WHERE amount > 100;  -- returns 10 rows
-- (before next select, another transaction adds a matching row)
SELECT * FROM orders WHERE amount > 100;  -- returns 11 rows (phantom)
```

#### 🧠 Use case:

* When you want repeatable reads, but can tolerate phantom inserts.
* Used in reporting, analytics, or financial apps.

---

### 4. **SERIALIZABLE** (Highest Isolation)

#### 🔍 What it allows:

* Simulates transactions running **one after another**, even though they may run in parallel.
* Prevents **all** concurrency problems: dirty reads, non-repeatable reads, and phantom reads.

#### ⚠️ Problems it prevents:

* ✅ Dirty reads
* ✅ Non-repeatable reads
* ✅ Phantom reads

#### 📌 Example:

Transaction A:

```sql
BEGIN;
SELECT COUNT(*) FROM orders WHERE amount > 100;
-- Blocks inserts from other transactions that would affect the result
```

Transaction B:

```sql
-- INSERT INTO orders (amount) VALUES (200); -- Will wait or fail depending on locking
```

#### 🧠 Use case:

* High-integrity systems where consistency is critical (e.g. banking).
* Lower performance due to strict locking and blocking.

---

## 🔁 Summary Table

| Isolation Level  | Dirty Reads | Non-Repeatable Reads | Phantom Reads | Performance Impact |
| ---------------- | ----------- | -------------------- | ------------- | ------------------ |
| READ UNCOMMITTED | ✅ Allowed   | ✅ Allowed            | ✅ Allowed     | 🔥 Fastest         |
| READ COMMITTED   | ❌ Prevented | ✅ Allowed            | ✅ Allowed     | ⚡ Fast             |
| REPEATABLE READ  | ❌ Prevented | ❌ Prevented          | ✅ Allowed     | ⚠️ Medium          |
| SERIALIZABLE     | ❌ Prevented | ❌ Prevented          | ❌ Prevented   | 🐢 Slowest         |

---

## 🧑‍💻 Setting Isolation Level (SQL Example)

PostgreSQL:

```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Your queries
COMMIT;
```

MySQL:

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
-- Your queries
COMMIT;
```

---

## Final Thoughts

* Use **READ COMMITTED** by default unless you need stronger consistency.
* Use **REPEATABLE READ** or **SERIALIZABLE** for sensitive or financial operations.
* Understand the **trade-off between consistency and performance**.

---

