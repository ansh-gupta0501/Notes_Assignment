# subnetting and Ip addresing 

- We know that host (computer) is connected to the internet via a communication link. 
- The boundary between the communication link and the host is called an interface . Typically a host has only one interface .
- On the other hand, a router has two or more links and thus two or more interfaces. 
- Both host and router send and receive IP datagrams via these interfaces . 
- It is possible only if the interfaces have their addresses and the addresses they have are called IP addresses
- This IP addresses is linked with the interface and not with the host and router. 
- We know that Binary number system uses two symbols - 0 and 1 . If i write a sequence of 0s and 1s , for example, 00100101, we say , it is 8-bit in length
- Similarly **IPV4** address is 32-bit in length. 11000001 00100000 11011000 00001001
- 8 bit represent 1 byte. so **IPV4** is 32 bit or 4 bytes in length. 
- Each byte is written in the form of decimal numbers separated with dots. 193 .  32 .  246 . 9
- This notation of IPV4 address is called dotted-decimal notation . 
- Now a portion of this IP address(193.32.216.9) is determined by the subnet to which the device is connected. 

- Consider a router is connected to six hosts via Ethernet switch or wireless access point(WAP). The router has three interfaces and each host has one interface . Each interface has its ip address. (so total 9 ip addresses)
- Please note that each host interface and the router interface to which hosts are connected has the same ip address format(let's say 223.1.1.xxx , 223.1.2.xxx , 223.1.3.xxx) 
- The networking connecting the host interfaces and one router interface having the same ip address format (223.1.1.xxx) is called subnet and here it is represented as 223.1.1.0/24 , where '/24' is called subnet mask 
- It means that all interfaces in this subnet have same leftmost 24 bits(223.1.1)(in ip address)
- Similarly , two other subnets are 223.1.2.0/24 and 223.1.3.0/24
- An organisation (company or academic institutio ) has multiple subnets where each subnet has different address
- In the global internet , the ip addressing is handled by Classless Interdomain Routing or CIDR address assignment strategy
- In CIDR addressing , the subnet address is generalised to a.b.c.d/x , where 'x' indicates the number of bits from left. 
- The first x-bits is called network prefix. 
- An organisation is assigned a range of IP addresses with a common network prefix. 
- Eg. if we have 200.23.16.0/20 . it means all devices with the organisation's network has the same leftmost '20' bits. Now withing the organisation , the remaining 12 bits (32-20)can be used for further subnetting
