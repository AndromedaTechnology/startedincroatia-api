<h1 align="center">Started In Croatia.com</h1>
<p align="center">
  <a href="https://startedincroatia.com"><img src="https://startedincroatia.com/img/icons/logo.png"  alt="Started In Croatia Logo" /></a>
  <br />
  <br />
  <a href="https://startedincroatia.com">Best of Croatia</a>
  <br />
  <br />
  <br />
  <a href="https://startedincroatia.com"><img src="https://heroku-badge.herokuapp.com/?app=habitus-api&style=flat&svg=1&root=api"  alt="Heroku" /></a>
  <br />
  <img src="https://badges.aleen42.com/src/node.svg" alt="Node" />
  <img src="https://badges.aleen42.com/src/typescript.svg" alt="TypeScript" />
  <img src="https://badges.aleen42.com/src/docker.svg" alt="Docker" />
  <img src="https://badges.aleen42.com/src/jest_1.svg" alt="Jest" />
  <br />
  <a href="https://medium.com/@StartedInCroatia"><img src="https://badges.aleen42.com/src/medium.svg" alt="Medium" /></a>
  <a href="https://twitter.com/StartedInCro"><img src="https://badges.aleen42.com/src/twitter.svg" alt="Twitter" /></a>
  <a href="https://www.patreon.com/moltouni"><img src="https://badges.aleen42.com/src/patreon.svg" alt="Patreon" /></a>
  <a href="https://www.buymeacoffee.com/moltouni"><img src="https://badges.aleen42.com/src/buymeacoffee.svg" alt="Buymeacoffee" /></a>
  <br />
  <br />
</p>

API for [**StartedInCroatia**](https://startedincroatia.com) [[Github - Frontend](https://github.com/AndromedaTechnology/startedincroatia)].

```
Started in Croatia.

Open-Source.
```

# 1. Technology

- TypeScript
- Koa.js
- Database: MongoDB: Mongoose
- Config: Dotenv, Joi
- Testing: Jest: SuperTest, MongoDBMemoryServer
- Docker: MongoDB

# 2. Features

- 🥰 Link CRUD
- 🔐 JWT auth for Admin actions

# 3. Run

**Docker**

Runs `MongoDB` container.

```
cd docker
cp .env.example .env
docker-compose up -d
```

**Application**

```
# Return to root
cd ..
cp .env.example .env
npm i
npm run dev
```

# 4. Tests

Using `Jest` Testing Framework.

Jest uses `SuperTest` and `MongoDBMemoryServer`.

```
npm run test
```

# 5. Postman

Check out [Postman Documentation]().

Pre-set environment variables:

- `host`
- `admin_password`

Dynamic environment variables,
automatically set in tests:

- `access_token`

# 6. Protected Routes [Admin access]

Few routes are protected with `jwtCheck` middleware.

Requests going to these routes require `Authorization: Bearer {token}` header.

**Protected Routes**

- [Link][update,delete]

**Getting access token**

Endpoint: `POST /auth/token`.

Body: `{ password: ADMIN_PASSWORD }`.

**Admin password**

`ADMIN_PASSWORD` is defined in `.env` file.

It defaults to `secret`.

# 7. Frontend

Written in `TypeScript`,

using `Vue.js` and `Vuetify`.

**Join the open-source development - [Github - StartedInCroatia - Frontend](https://github.com/AndromedaTechnology/StartedInCroatia)**.

Check the live version at [startedincroatia.com](https://startedincroatia.com).

# 8. Social

- [Medium](https://medium.com/@StartedInCroatia)
- [Twitter](https://twitter.com/StartedInCro)

<br/>
<h3 align="center">
  Crafted with ❤️ <br />
  by contributors around the 🌍 World and <a href="https://andromeda.technology/">🌌 Andromeda</a>.
</h3>
