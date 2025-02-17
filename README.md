# Project : asgmt4_mechanical_keyboard_shop_api

## Live link:

https://asgmt4-mechanical-keyboard-shop-api.vercel.app

## Github link:

https://github.com/aburaihan8715/asgmt4_mechanical_keyboard_shop_api

## Technologies used:

1. Typescript
2. Node js
3. Express js
4. Mongodb

## Packages used:

1. cors
2. mongoose
3. zod
4. jwt
5. eslint

## API Endpoints

## Products:

- /api/v1/products(POST)
- /api/v1/products(GET)
- /api/v1/products/:id(GET)
- /api/v1/products/:id(PUT)
- /api/v1/products/:id(DELETE)

## Scripts

```js
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "start": "node ./dist/server.js",
  "build": "tsc",
  "lint": "npx eslint src --ignore-pattern .ts",
  "lint:fix": "npx eslint src --fix",
  "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
  "prettier:fix": "npx prettier --write src"
```

<p>======end=======</p>
