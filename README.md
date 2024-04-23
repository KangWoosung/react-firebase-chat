
## Its not done yet!! I'm still working on this. 
2024-04-24 07:23:55

##The base code here is from 

https://www.youtube.com/watch?v=domt_Sx-wTY&t=779s&ab_channel=LamaDev

https://github.com/safak/react-firebase-chat



I am refactoring his code with TypeScript, Tailwind and some React Libs like React-Hook-Form, Zod etc. 

And Zustand was replaced with React Context API as well.

Thanks again to Lama Dev for the lecture. It was a big step forward for me.


## This App requires Firebase API Key.

Add the API Key to .env.local file and don't forget to add it to .gitignore. 

```bash
FIREBASE_API_KEY=[YOUR API KEY]
```

API Key can be called with the following

```bash
process.env.FIREBASE_API_KEY
```



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
