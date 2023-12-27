"use server";

import { currentUser } from "@clerk/nextjs";

const getUser = async () => {
  const user = await currentUser();

  return JSON.stringify(user);
};

export default getUser;
