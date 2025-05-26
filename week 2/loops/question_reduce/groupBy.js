function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

console.log(groupBy([
  { type: 'fruit', name: 'apple' },
  { type: 'veg', name: 'carrot' }
], 'type'));
// {
//   fruit: [ { type: 'fruit', name: 'apple' } ],
//   veg: [ { type: 'veg', name: 'carrot' } ]
// }
