import { User } from '@prisma/client';

export const userMapper = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
