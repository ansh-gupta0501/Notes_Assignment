function isValidIPv4(ip) {
  const parts = ip.split('.');  //"192.168.0.1" → ['192', '168', '0', '1']
  return parts.length === 4 && parts.every(p => {
    const n = Number(p);
    return p !== '' && !isNaN(n) && n >= 0 && n <= 255 && p == n;
  });
}


const ips = ['192.168.0.1', '10.300.0.2', '1.2.3.4'];
console.log(ips.filter(isValidIPv4)); // ['192.168.0.1', '1.2.3.4']


/* 
  .every(p => { ... })
Checks that each part meets strict number criteria:

const n = Number(p);
Converts the string to a number.

return p !== ''       // not an empty part
    && !isNaN(n)      // it's a number
    && n >= 0 && n <= 255 // in IPv4 range
    && p == n;        // ensures no leading 0s like '01'
    
Why p == n?
To avoid:

'01' == 1 → true ✅
'01' === 1 → false ❌
But we're using loose equality (==) intentionally here to make sure that:

'01' becomes 1, and '01' == 1 is true

However, '01' === 1 would be false

This trick allows numeric strings to be compared after conversion, while still rejecting truly non-numeric str
*/