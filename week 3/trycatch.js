// const funtion = async()=>{
//     try {
//         const data = await Promise.resolve(1);


//     } catch (error) {
//         console.log(error.message)
//     }
// }

// Given an array of product objects (with id, name, and price), write a JavaScript function to:
 
// Filter products below a specified price.
 
// Sort the filtered products alphabetically by name.
 
// Example Input:
 
// javascript
// const products = [
//   { id: 1, name: "Laptop", price: 999 },
//   { id: 2, name: "Mouse", price: 20 },
//   { id: 3, name: "Keyboard", price: 50 },
//   { id: 4, name: "Monitor", price: 200 },
// ];
// const maxPrice = 100;

// function filterProducts(product,maxPrice){
//     return product
//             .filter((item)=>item.price < maxPrice)
//             .sort((a,b)=>a.name.localeCompare(b.name))
// }


// console.log(filterProducts(products,maxPrice))


// Find the top 5 users who spent the most in the last 3 months.
 
// Sample Data
// users table:
 
// id	name	email	signup_date
// 1	Alice	alice@example.com	2023-01-15
// 2	Bob	bob@example.com	2023-02-20
// 3	Charlie	charlie@example.com	2023-03-10
// orders table:
 
// id	user_id	amount	order_date
// 1	1	100	2024-03-01
// 2	1	50	2024-04-15
// 3	2	200	2024-05-10
// 4	3	75	2024-05-20


// SELECT u.id ,u.name,u.email, SUM(o.amount) as total FROM users u JOIN orders o ON u.id = o.id WHERE o.order_date >= CURRENT_DATE - INTERVAL '3 MONTHS' GROUP BY u.id ,u.name,u.email 
// ORDER BY total DESC  LIMIT 5;

//  SELECT u.id, u.name, u.email, SUM(o.amount) AS total
// postgres-# FROM users u
// postgres-# JOIN orders o ON u.id = o.user_id
// postgres-# WHERE o.order_date >= CURRENT_DATE - INTERVAL '3 MONTHS'
// postgres-# GROUP BY u.id, u.name, u.email
// postgres-# ORDER BY total DESC
// postgres-# LIMIT 5;