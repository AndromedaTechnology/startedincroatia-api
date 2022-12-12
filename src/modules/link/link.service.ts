import mongoose from "mongoose";
import linkModel, { LinkDto } from "./link.model";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// example how to use node's dns resolver
// TODO: Enable (node:dns) in tests
const dns = require("node:dns");
async function fetchLink(href: string): Promise<any> {
  return getLinkPreview(href, {
    resolveDNSHost: async (url: string) => {
      return new Promise((resolve, reject) => {
        const hostname = new URL(url).hostname;
        dns.lookup(hostname, (err: any, address: any, family: any) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(address); // if address resolves to localhost or '127.0.0.1' library will throw an error
        });
      });
    },
    followRedirects: `manual`,
    handleRedirects: (baseURL: string, forwardedURL: string) => {
      const urlObj = new URL(baseURL);
      const forwardedURLObj = new URL(forwardedURL);
      if (
        forwardedURLObj.hostname === urlObj.hostname ||
        forwardedURLObj.hostname === "www." + urlObj.hostname ||
        "www." + forwardedURLObj.hostname === urlObj.hostname
      ) {
        return true;
      } else {
        return false;
      }
    },
  }).catch((e) => {
    // will throw a detected redirection to localhost
  });
}
class LinkService {
  async findAll(): Promise<Array<LinkDto>> {
    const items = await linkModel.find();
    return items;
  }

  async find(id: mongoose.Types.ObjectId): Promise<LinkDto> {
    const item = await linkModel.findById(id);
    return item;
  }

  async create(data: LinkDto): Promise<LinkDto> {
    if (data.href) {
      const response = await fetchLink(data.href);
      if (response) {
        data.name = response.title ?? null;
        data.description = response.description ?? null;
        data.favicon_url =
          response.favicons && response.favicons.length
            ? response.favicons[0]
            : null;
        data.avatar_url =
          response.images && response.images.length ? response.images[0] : null;
      }
      console.log("--response", response);
    }
    const item = await linkModel.create(data);
    return item;
  }

  async update(id: mongoose.Types.ObjectId, data: LinkDto): Promise<LinkDto> {
    const item = await linkModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return item;
  }

  async delete(id: mongoose.Types.ObjectId): Promise<LinkDto> {
    const item = await linkModel.findByIdAndRemove(id);
    return item;
  }
}

export default new LinkService();
