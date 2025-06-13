# Redis is in-memory data storage

## Data Types

### Strings
- normal data is called strings in redis

```redis
> set bike:1 Deimos        // bike:1 is a key and deimos is value
OK         // means value is set 
> get bike:1               // getting key bike:1
"Deimos"                   // output


> set name ansh
OK
get name
"ansh"
```

- convention for naming
- **<entity>:<id> value** because in database data is set according to table

```
id.      name
1.      piyush
2.      john
3.      jane
```

```
set user:1 piyush // it clearly denotes that this user key with having id 1 is caching piyush
set user:2 jhon
```
- Also redis based on delimeter : , group the keys together . 


```
    > set bike:1 bike nx  // we are saying to set bike:1 only if it is not already exists // SETNX stores a string value only if the key doesn't already exist. Useful for implementing locks.  // if we don't use nx we see its value will be changed 
    (nil)              // because bike:1 key already exists 

    > set bike:1 bike xx    //  Set the key only if it already exists (i.e., "set if exists").             // if key does not exist , this command does nothing return nil
    OK
```


```
> mget user:1 user:2 mgs:1
1) piyush
2) jhon
3) (nil)

MGET retrieves multiple string values in a single operation.

```

```
  > mset bike:1 "Deimos" bike:2 "Ares" bike:3 "Vanth"   // mset used to set multiple values
    OK
    > mget bike:1 bike:2 bike:3
    1) "Deimos"
    2) "Ares"
    3) "Vanth"
```

- we can also increment value 

```

> set count 0
OK
> incr count           // the count value will be incremented 
integer) 1            //The INCR command parses the string value as an integer, increments it by one, and finally sets the obtained value as the new value.

> incrby count 10 // increment the count by 10
integer 11

- There are other similar commands like  DECR and DECRBY. 
- these commands can used to track how many users visited your websites
```

- Limit :- By default a single redis string can be a maximum of 512 MB.

---

### list 



### 🔁 `LMOVE`: **Atomically move an element from one list to another**

#### 📌 Use:

Moves an element from one list to another — you choose whether to remove from the left/right and add to the left/right.

#### 🧠 Syntax:

```redis
LMOVE source destination LEFT|RIGHT LEFT|RIGHT
```

#### ✅ Example:

```redis
RPUSH list1 A B C       # list1 = [A, B, C]
RPUSH list2 X Y         # list2 = [X, Y]

LMOVE list1 list2 LEFT RIGHT
```

* Moves `A` (from **left** of `list1`) to **right** of `list2`
* Result:

  * `list1 = [B, C]`
  * `list2 = [X, Y, A]`

#### 🛡️ Atomic:

This move is **atomic**, meaning no other command can interrupt it between the pop and push.

---

### 📖 `LRANGE`: **Get a range of elements from a list**

#### 📌 Use:

Fetch elements in a list within a specified index range.

#### 🧠 Syntax:

```redis
LRANGE key start stop
```

#### ✅ Example:

```redis
RPUSH list1 A B C D E
LRANGE list1 1 3
```

* Returns: `[B, C, D]` (elements from index 1 to 3)

#### 🔄 Notes:

* Indexes are **zero-based**
* You can use `-1` for the **last element**
* Entire list: `LRANGE list1 0 -1`

---

### ✂️ `LTRIM`: **Trim a list to a given range**

#### 📌 Use:

Keeps only the elements in a specified index range — removes everything else.

#### 🧠 Syntax:

```redis
LTRIM key start stop
```

#### ✅ Example:

```redis
RPUSH list1 A B C D E
LTRIM list1 1 3
```

* Keeps elements from index 1 to 3 → `[B, C, D]`
* `list1` is now `[B, C, D]`

#### ⚠️ Destructive:

This modifies the list — it deletes elements outside the given range.

---

### 🧠 Summary Table:

| Command  | Purpose                            | Read or Write | Atomic? |
| -------- | ---------------------------------- | ------------- | ------- |
| `LMOVE`  | Move item from one list to another | Write         | ✅ Yes   |
| `LRANGE` | Get list items in range            | Read          | ❌ No    |
| `LTRIM`  | Keep only items in range (trim)    | Write         | ❌ No    |

---

Let me know if you want a real Node.js usage example for these!




















