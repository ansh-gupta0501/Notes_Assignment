import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const main = async()=>{

    //? create (insert data)
    //? single user

    // const user = await prisma.user.create({
    //     data : {
    //         name : "ansh gupta",
    //         email : "ansh@gmail.com"
    //     }
    // });

    // console.log(user)

    //? multiple user

    const newUsers = await prisma.user.createMany({  // craete many will return how many data are inserted
        data : [
            {name : "rahul",email : "rahul@gmail.com",gender : "male"},
            {name : "Bob", email : "bob@example.com",gender : "male"}
        ]
    })

    console.log(newUsers)

    // --------------------------------

    //? Read (Fetch data)
    //? Get All Users

    // const users = await prisma.user.findMany();
    // console.log(users)

    //? Get a single user by id

    // const user = await prisma.user.findUnique({
    //   where : {id : 2}
    // });
    // console.log(user)

    // get users with filtering

    // const user = await prisma.user.findMany({
    //   where : {name : 'ansh gupta'}       
    // });
    // console.log(user)
  
    // -------------------------------

    //? Update (Modify Data)
    //? Update One User

    // const updatedUser = await prisma.user.update({    // during update , we should use unique parameter in where
    //   where : {id : 3},
    //   data : { name : "ansh"}
    // })

    // console.log(updatedUser)

    //? update multiple users

    // const updatedUser = await prisma.user.updateMany({  // { count: 1 } // but in updateMany no need to give unique parameter in where , you can give any parameter 
    //   where : {id : 3},
    //   data : { name : "rahul"}
    // })

    // console.log(updatedUser)

    // ------------------------------------------------------------------

    //? Delete(remove data)
    //? Delete one user 

    // const deletedUser = await prisma.user.delete({ // in delete , same unique parameter in where clause
    //   where : {id : 3}

    // })

    // console.log(deletedUser)

    //Delete multiple users

    // const deletedUser = await prisma.user.deleteMany({  // {count : 2} // in deletemany you can give any field in where 
    //   where : {
    //     id : {
    //       in : [2,4]
    //     }
    //   }

    // })

    // console.log(deletedUser)

}



main()
.catch((e)=>{console.error(e)})
.finally(async ()=>{
  await prisma.$disconnect();
});

//prisma generate -> updates the prisma client code so you can user the latest schema in your application 