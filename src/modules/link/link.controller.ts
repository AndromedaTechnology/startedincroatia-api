import mongoose from "mongoose";
import { RouterContext } from "koa-router";

import { LinkDto } from "./link.model";
import LinkService from "./link.service";

class LinkController {
  async findAll(ctx: RouterContext) {
    ctx.body = await LinkService.findAll();
    return ctx;
  }

  async find(ctx: RouterContext) {
    try {
      const item = await LinkService.find(
        mongoose.Types.ObjectId(ctx.params.id)
      );
      ctx.body = item;
    } catch (e) {
      ctx.throw(404);
    }
    return ctx;
  }

  async create(ctx: RouterContext) {
    try {
      const item = await LinkService.create(ctx.request.body as LinkDto);
      ctx.body = item;
    } catch (e) {
      ctx.throw(422);
    }
    return ctx;
  }

  async update(ctx: RouterContext) {
    try {
      const item = await LinkService.update(
        mongoose.Types.ObjectId(ctx.params.id),
        ctx.request.body as LinkDto
      );
      ctx.body = item;
    } catch (e) {
      ctx.throw(422);
      // ctx.throw(403);
    }
    return ctx;
  }

  async delete(ctx: RouterContext) {
    try {
      const item = await LinkService.delete(
        mongoose.Types.ObjectId(ctx.params.id)
      );
      ctx.body = item;
    } catch (e) {
      ctx.throw(404);
      // ctx.throw(403);
    }
    return ctx;
  }
}

export default new LinkController();
