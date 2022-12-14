import { Server } from "http";
import supertest from "supertest";
import { Mongoose } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import config from "../../config";
import { app } from "../../index";
import { databaseSetup } from "../../database";
import authService from "../auth/auth.service";

// Server
let server: Server;
let request: supertest.SuperAgentTest;

// Database
let mongoMemoryServer: MongoMemoryServer;
let mongoConnection: Mongoose;

// Token
let token: string;

beforeAll(async () => {
  // Server
  server = app.listen();
  request = supertest.agent(server);

  // Database
  mongoMemoryServer = new MongoMemoryServer();
  mongoConnection = await databaseSetup(await mongoMemoryServer.getUri());

  token = authService.getToken(config.admin_password);

  return Promise.resolve();
});

afterAll(async () => {
  // Server
  server.close();

  // Database
  await mongoConnection.disconnect();
  await mongoMemoryServer.stop();

  return Promise.resolve();
});

let itemId: string;
const itemHref = "https://github.com/AndromedaTechnology/habitus";
const itemName =
  "GitHub - AndromedaTechnology/habitus: 🏄 State-of-the-art Tracker for emotions, habits and thoughts. | Gamified. | Anonymous and open source. | Healthiest version of you";
const itemNameUpdated = "Tenacious";

const responseType = "application/json";

describe("link.routes", () => {
  it("create", async () => {
    const response = await request.post(config.api_prefix + "/links").send({
      href: itemHref,
    });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual(responseType);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBeDefined();
    expect(response.body.href).toEqual(itemHref);
    expect(response.body.name).toEqual(itemName);

    itemId = response.body._id;
  });

  it("findAll", async () => {
    const response = await request.get(config.api_prefix + "/links");

    expect(response.status).toEqual(200);
    expect(response.type).toEqual(responseType);
    expect(response.body).toBeDefined();
    expect(response.body[0].name).toEqual(itemName);
  });

  it("find", async () => {
    const response = await request.get(config.api_prefix + `/links/${itemId}`);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual(responseType);
    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(itemId);
  });

  it("update", async () => {
    const response = await request
      .patch(config.api_prefix + `/links/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: itemNameUpdated,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual(responseType);
    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(itemId);
    expect(response.body.name).toEqual(itemNameUpdated);
  });

  it("delete", async () => {
    const response = await request
      .delete(config.api_prefix + `/links/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual(responseType);
    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(itemId);
    expect(response.body.name).toEqual(itemNameUpdated);
  });
});
