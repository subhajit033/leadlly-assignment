
import { PrismaClient } from '@prisma/client';

const { userDeTail, todo } = new PrismaClient();

const insertUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const res = await userDeTail.create({
    data: {
      email,
      
      firstName,
      lastName,
    },
  });

  console.log(res);
};

interface UpdateData {
  firstName: string;
  lastName: string;
  email: string;
}

const deleteUser = async (email: string) => {
  const res = await userDeTail.delete({
    where: {
      email,
    },
  });
  console.log(res);
};

async function updateUser({ firstName, lastName, email }: UpdateData) {
  const res = await userDeTail.update({
    where: { email },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}

const getUser = async (email: string) => {
  const res = await userDeTail.findFirst({
    where: { email },
  });
  console.log(res);
};

// updateUser( {
//   email: 'subha@gmail.com',
//   firstName: "new name",
//   lastName: "singh"
// })

const deleteTable = async ()=>{
  try {
    await todo.deleteMany();
    console.log('succes');
  } catch (err) {
    console.log(err);
  }
}

// insertUser('kundu@gmail.com', '654321', 'Bubai', 'Dhibar');

deleteTable();
