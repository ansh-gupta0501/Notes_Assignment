function mapTree(node, fn) {
  return {
    value: fn(node.value),
    children: node.children.map(child => mapTree(child, fn))
  };
}


const tree = { value: 1, children: [{ value: 2, children: [] }] };
console.log(mapTree(tree, x => x * 2));


/* 
The Tree Structure

const tree = {
  value: 1,
  children: [
    { value: 2, children: [] }
  ]
};
This represents a tree with:

A root node of value: 1

One child node with value: 2

That child has no children (children: [])
*/