# Socially - Social Meadia Web App [Preview🪬📫](https://socially-next.vercel.app/)

- **Socially 🪬📫** is a modern, fully-featured social media platform inspired by Instagram, built with React.js, Next.js, Node.js, Express.js, and MongoDB (using Prisma ORM). It allows users to explore posts, comments, and profiles without logging in, while authenticated users can upload posts, like, comment, follow, and unfollow others. The app also includes a real-time notification system to keep users updated on likes, comments, and new followers.

With Clerk for authentication, Uploadthing for asset storage, and Next Themes & Tailwind CSS for styling (including light/dark mode), Socially delivers a sleek, responsive, and user-friendly experience across all devices.

## Connect me on 🌐:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/sandip-chavda-86704a2aa) [![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/@SandipC70731202)

## Videos & Images

- ## Video

- ## Images

| Home Page | Home Page | Ligh Mode Home Page |
| --------- | --------- | ------------------- |
|           |           |                     |

| Login & Register Page | Profile Page | Notifications Page |
| --------------------- | ------------ | ------------------ |
|                       |              |                    |

| Edit Profile Page |
| ----------------- |
|                   |

## Key Features

- **Explore Without Login 👀🌐:** Browse posts, comments, and profiles without needing an account.

- **Authenticated Interactions 🔑💬** Log in or sign up to upload posts, like, comment, follow, and unfollow.

- **Real-Time Notifications 🔔📨** Get notified instantly for likes, comments, and new followers.

- **User Profiles 🖼️👤:** Customize your profile and view others' posts, followers, and following numbers and their liked post as well.

- **Light & Dark Mode 🌞🌙:** Switch between themes for a personalized experience.

- **Responsive Design 📱💻:** Enjoy a seamless experience on desktop, tablet, and mobile.

## Tech-Stack & Tools

- **Front-End & Back-End:** Next.js, TypeScript, React.js, Node.js, Express.js

- **Styling:** Tailwind CSS, Framer Motion, Shadcn UI, Magic UI

- **Database:** MongoDB, Prisma ORM

- **Authentication:** Clerk

- **Asset Storage:** Uploadthing

- **Tools:** VS Code, Postman, MongoDB Compass, Chrome

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash

- **`NODE_ENV = development`** `in development mode`

- **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = `**

- **`CLERK_SECRET_KEY = `**

- **`DATABASE_URL = `**

- **`UPLOADTHING_TOKEN = `**

```

</br>
**💡 Tip:** If you want to use **PostgreSQL** instead of MongoDB for this project, use the schema provided below. Simply copy and paste it into your Prisma schema file (`schema.prisma`) and configure your database connection accordingly.

<details>
<summary><b>PostgreSQL Schema (Click to Expand)</b></summary>
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  clerkId   String   @unique
  name      String?
  bio       String?
  image     String?
  location  String?
  website   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

// Relations:
posts Post[] // One-to-many
comments Comment[] // One-to-many
likes Like[] // One-to-many

followers Follows[] @relation("following") // users who follow this user
following Follows[] @relation("follower") // users this user follows

notifications Notification[] @relation("userNotifications") // notifications received by a user
notificationsCreated Notification[] @relation("notificationCreator") // notifications triggered by a user
}

model Post {
id String @id @default(cuid())
authorId String
content String?
image String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

// Relations
author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
comments Comment[]
likes Like[]
notifications Notification[]
}

model Comment {
id String @id @default(cuid())
content String
authorId String
postId String
createdAt DateTime @default(now())

// Relations
author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
notifications Notification[]

@@index([authorId, postId]) // composite index for faster queries
}

model Like {
id String @id @default(cuid())
postId String
userId String
createdAt DateTime @default(now())

// Relations
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
post Post @relation(fields: [postId], references: [id], onDelete: Cascade)

@@index([userId, postId]) // composite index for faster queries
@@unique([userId, postId]) // prevents same user liking post twice
}

model Follows {
followerId String
followingId String
createdAt DateTime @default(now())

// Relations
follower User @relation("follower", fields: [followerId], references: [id], onDelete: Cascade)
following User @relation("following", fields: [followingId], references: [id], onDelete: Cascade)

@@index([followerId, followingId]) // composite index for faster queries
@@id([followerId, followingId]) // composite primary key prevents duplicate follows
}

model Notification {
id String @id @default(cuid())
userId String
creatorId String
type NotificationType
read Boolean @default(false)
postId String?
commentId String?
createdAt DateTime @default(now())

// Relations
user User @relation("userNotifications", fields: [userId], references: [id], onDelete: Cascade)
creator User @relation("notificationCreator", fields: [creatorId], references: [id], onDelete: Cascade)
post Post? @relation(fields: [postId], references: [id], onDelete: Cascade)
comment Comment? @relation(fields: [commentId], references: [id], onDelete: Cascade)

@@index([userId, createdAt])
}

enum NotificationType {
LIKE
COMMENT
FOLLOW
}

````

</details>

## Run Locally

- **Clone the project**

```bash
  git clone https://github.com/Sandip-Chavda/Socially__Next.js_React.js.git
````

- **Install dependencies**

```bash
  npm install
```

- **Run project**

```bash
  npm run dev
```

- Access the Application: Open your web browser and visit **`http://localhost:3000`** to access the **HonestyBox**.

## Deploy on Vercel

- The easiest way to deploy your Next.js app is to use the **[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)** from the creators of Next.js.

- Check out our **[Next.js deployment documentation](https://nextjs.org/docs/deployment)** for more details.

## Learn More 📚

To get a deeper understanding of the technologies used in **Socially**, refer to the following resources:

### **Next.js**

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/) - Your feedback and contributions are welcome!

### **Authentication (Clerk)**

- [Clerk Documentation](https://docs.clerk.dev/) - Learn how to implement and customize authentication in your Next.js projects with Clerk.

### **Styling**

- [Tailwind CSS](https://tailwindcss.com/docs/installation) - Visit for a better understanding of styling and customizing your website.
- [Framer Motion](https://www.framer.com/motion/) - Learn how to add animations and interactions to your React components.
- [Shadcn UI](https://ui.shadcn.com/docs/installation/next) - Follow the link to set up Shadcn UI for your Next.js application and explore its components.
- [Magic UI](https://magicui.design/docs/components/) - Explore cool animated components and set up Magic UI for your Next.js app.

### **Database**

- [MongoDB Documentation](https://www.mongodb.com/docs/manual/tutorial/getting-started/) - Learn more about MongoDB and how to use it effectively.
- [Prisma ORM](https://www.prisma.io/docs) - Understand how to use Prisma ORM for database management and schema generation.

### **Asset Storage**

- [Uploadthing Documentation](https://docs.uploadthing.com/) - Learn how to handle file uploads and storage in your application.

### **Tools**

- [VS Code](https://code.visualstudio.com/docs) - Master the code editor used for building this project.
- [Postman](https://learning.postman.com/) - Learn how to test and debug APIs effectively.
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Explore and manage your MongoDB data visually.

<!-- ## License

[MIT](https://choosealicense.com/licenses/mit/) -->
