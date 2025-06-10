import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],        // it will print every prisma query which is converted to sql on the console

})


async function main() {
  try {
   
    await prisma.$connect();
    console.log('Database connected successfully!');

  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    
    await prisma.$disconnect();
  }
}

export {main,prisma};

