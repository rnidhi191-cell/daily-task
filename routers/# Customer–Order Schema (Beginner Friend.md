# Customer–Order Schema (Beginner Friendly)

This document explains how to design a **Customer–Order schema** and use MongoDB operators like **$push, $pull, $in, $ne**. This is written for **freshers / beginners**.

---

## 1️⃣ Problem Understanding

We want:

* A **Customer**
* Each customer can have **multiple orders**
* Perform MongoDB operations like:

  * Add order (push)
  * Remove order (pull)
  * Find data using conditions (in, ne)

---

## 2️⃣ Customer Schema (MongoDB)

```js
{
  _id: ObjectId("...") ,
  name: "Rahul Sharma",
  email: "rahul@gmail.com",
  phone: "9876543210",
  status: "active", // active | inactive

  orders: [
    {
      orderId: "ORD1001",
      product: "iPhone 15",
      amount: 79999,
      paymentType: "credit_card", // apple_pay | paypal | credit_card
      orderStatus: "completed", // pending | completed | cancelled
      createdAt: ISODate("2025-01-10")
    }
  ],

  createdAt: ISODate("2025-01-01")
}
```

---

## 3️⃣ $push – Add New Order

**Use case:** Add a new order to a customer

```js
db.customers.updateOne(
  { _id: ObjectId("CUSTOMER_ID") },
  {
    $push: {
      orders: {
        orderId: "ORD1002",
        product: "MacBook Pro",
        amount: 149999,
        paymentType: "paypal",
        orderStatus: "pending",
        createdAt: new Date()
      }
    }
  }
)
```

✔ Adds a new order inside `orders` array

---

## 4️⃣ $pull – Remove Order

**Use case:** Delete a cancelled order

```js
db.customers.updateOne(
  { _id: ObjectId("CUSTOMER_ID") },
  {
    $pull: {
      orders: { orderId: "ORD1002" }
    }
  }
)
```

✔ Removes order where `orderId = ORD1002`

---

## 5️⃣ $in – Match Multiple Values

**Use case:** Find customers who paid using PayPal or Apple Pay

```js
db.customers.find({
  "orders.paymentType": { $in: ["paypal", "apple_pay"] }
})
```

✔ Matches if paymentType is in the given list

---

## 6️⃣ $ne – Not Equal Condition

**Use case:** Find customers whose status is NOT inactive

```js
db.customers.find({
  status: { $ne: "inactive" }
})
```

✔ Excludes inactive users

---

## 7️⃣ Combined Example ($in + $ne)

```js
db.customers.find({
  status: { $ne: "inactive" },
  "orders.paymentType": { $in: ["credit_card", "paypal"] }
})
```

✔ Active customers who used Credit Card or PayPal

---

## 8️⃣ Why This Design Is Good for Freshers

✔ Simple structure
✔ Easy to read
✔ No joins required
✔ Real-world use case
✔ Covers common MongoDB interview questions

---

## 9️⃣ Interview Tips (Important ⭐)

* `$push` → add data to array
* `$pull` → remove data from array
* `$in` → match from list
* `$ne` → not equal
* Arrays inside documents are very common in MongoDB

---

## 🔚 Summary

This schema supports:

* One customer → many orders
* Easy order management
* Clean & scalable design

Perfect for:

* Freshers
* Node.js + MongoDB projects
* Interview preparation

---

If you want:

* Node.js API example
* Mongoose schema
* Real production best practices

Tell me 👍

---

## 7️⃣ MongoDB Schema Structure (Both Approaches)

### A) Embedded (Nested) Schema — MongoDB

**Use when:** Orders are usually fetched with the customer and the order count per customer is limited.

```js
// customers collection
{
  _id: ObjectId("64f1..."),
  name: "John Doe",
  email: "john@example.com",
  orders: [
    {
      _id: ObjectId("650a..."),
      product_name: "iPhone 15",
      amount: 1200,
      status: "placed",
      created_at: ISODate("2025-01-10T10:00:00Z")
    }
  ]
}
```

**Pros**

* Very fast reads (single document)
* Simple queries

**Cons**

* Document size can grow (16MB limit)
* Not ideal for frequent order updates

---

### B) Referenced (Separate Collections) Schema — MongoDB

**Use when:** Orders are large, frequent, or queried independently.

```js
// customers collection
{
  _id: ObjectId("64f1..."),
  name: "John Doe",
  email: "john@example.com"
}

// orders collection
{
  _id: ObjectId("650a..."),
  customer_id: ObjectId("64f1..."),
  product_name: "iPhone 15",
  amount: 1200,
  status: "placed",
  created_at: ISODate("2025-01-10T10:00:00Z")
}
```

**Pros**

* Scales very well
* Cleaner data model
* Better for analytics

**Cons**

* Requires `$lookup` to join data

---

### 🔑 Quick Rule (Interview‑friendly)

* **Embedded** → Read‑heavy, small datasets
* **Referenced** → Write‑heavy, scalable systems


q-1create api order reference,register user ki b id dalni 
ek reference document
embeded document
new schema