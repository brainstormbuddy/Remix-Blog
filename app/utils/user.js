import { PrismaClient } from "@prisma/client";
import { marked } from "marked";

// let's create a reference to prisma
const prisma = new PrismaClient();
// async function since we will be loading external data
export async function getUsers() {
  // await prisma connection
  await prisma.$connect();
  // let's grab all posts using findMany()
  // the posts in prisma.posts is the collection we created in Mongo.db
  const allUsers = await prisma.users.findMany();
  // let's cleanup our connection
  prisma.$disconnect();
  // let's see what we are returning
  console.log(allUsers);
  return allUsers;
}

// this function is used to load a single post from a passed through slug
export async function getUser(slug) {
  //setup our prisma connection
  await prisma.$connect();

  // we will find the first database entry that matches the passed slug
  const foundSlug = await prisma.users.findFirst({
    where: {
      slug: slug,
    },
  });

  //let's extract the username
  let username = foundSlug.username;
  // using marked, we are going to convert the fullname into HTML so the blog post can render as entered in Markdown.
  let html = marked(foundSlug.fullname);
  // we need to cleanup our database connection
  prisma.$disconnect();

  // let's send back the slug, the title, and our markdown converted to html
  return { slug, username, html };
}

export async function createUser(user) {
  //Prisma connection
  await prisma.$connect();
  // prisma create
  await prisma.users.create({
    data: {
      username: user.username,
      slug: user.slug,
      fullname: user.fullname,
    },
  });
  // cleanup prisma connection
  prisma.$disconnect();
  // let's send back the slug we created
  return getUser(user.slug);
}

export async function getUserEdit(slug) {
  //setup our prisma connection
  await prisma.$connect();

  // we will find the first database entry that matches the passed slug
  const foundSlug = await prisma.users.findFirst({
    where: {
      slug: slug,
    },
  });

  let id = foundSlug.id;
  //let's extract the username
  let username = foundSlug.username;
  // since we are editing and not rendering we want to pull the original fullname value stored in the db
  let fullname = foundSlug.fullname;
  // we need to cleanup our database connection
  prisma.$disconnect();

  // let's send back the slug, the title, and our markdown
  return { id, slug, username, fullname };
}
// When updating we need to reference the ID being updated
export async function updateUser(user) {
  //Prisma connection
  await prisma.$connect();
  // prisma create
  console.log("updateUser id", user.id);
  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      username: user.username,
      slug: user.slug,
      fullname: user.fullname,
    },
  });

  // cleanup prisma connection
  prisma.$disconnect();
  // let's send back the slug we created
  return getUser(user.slug);
}
