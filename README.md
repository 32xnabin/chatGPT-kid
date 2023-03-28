## ImageGPT ,OpenAI ChatGPT and NextJs

![Preview](demo.gif)

### Set up environment variables

- rename [`.env.example`](.env.example) to `.env.local`:

```bash
cp .env.example .env.local
```

- update `OPENAI_API_KEY` with your [OpenAI](https://beta.openai.com/account/api-keys) secret key.

```js
OPENAI_API_KEY = xxxxx;
```

### Development

```js
npm install
npm run dev

# or

yarn
yarn dev
```

View the app at http://localhost:3000
