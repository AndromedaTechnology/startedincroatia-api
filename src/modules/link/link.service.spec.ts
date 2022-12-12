import { Server } from "http";
import supertest from "supertest";
import mongoose, { Mongoose } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { app } from "../../index";
import linkService from "./link.service";
import { databaseSetup } from "../../database";

// Server
let server: Server;
let request: supertest.SuperAgentTest;

// Database
let mongoMemoryServer: MongoMemoryServer;
let mongoConnection: Mongoose;

beforeAll(async () => {
  // Server
  server = app.listen();
  request = supertest.agent(server);

  // Database
  mongoMemoryServer = new MongoMemoryServer();
  mongoConnection = await databaseSetup(await mongoMemoryServer.getUri());

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

let itemId: mongoose.Types.ObjectId | undefined;
const itemHref = "https://github.com/AndromedaTechnology/habitus";
const itemName =
  "GitHub - AndromedaTechnology/habitus: 🏄 State-of-the-art Tracker for emotions, habits and thoughts. | Gamified. | Anonymous and open source. | Healthiest version of you";
const itemNameUpdated = "Tenacious";

describe("link.service", () => {
  it("create", async () => {
    const response = await linkService.create({
      href: itemHref,
    });

    expect(response).toBeDefined();
    expect(response._id).toBeDefined();
    expect(response.href).toEqual(itemHref);
    expect(response.name).toEqual(itemName);

    itemId = response._id;
  });

  it("findAll", async () => {
    const response = await linkService.findAll();

    expect(response).toBeDefined();
    expect(response[0].href).toEqual(itemHref);
    expect(response[0].name).toEqual(itemName);
  });

  it("find", async () => {
    const response = await linkService.find(itemId!);

    expect(response).toBeDefined();
    expect(response._id).toEqual(itemId);
    expect(response.href).toEqual(itemHref);
    expect(response.name).toEqual(itemName);
  });

  it("update", async () => {
    const response = await linkService.update(itemId!, {
      name: itemNameUpdated,
    });

    expect(response).toBeDefined();
    expect(response._id).toEqual(itemId);
    expect(response.href).toEqual(itemHref);
    expect(response.name).toEqual(itemNameUpdated);
  });

  it("delete", async () => {
    const response = await linkService.delete(itemId!);

    expect(response).toBeDefined();
    expect(response._id).toEqual(itemId);
    expect(response.href).toEqual(itemHref);
    expect(response.name).toEqual(itemNameUpdated);
  });
});
