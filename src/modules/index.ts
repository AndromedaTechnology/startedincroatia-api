import combineRouters from "koa-combine-routers";

import rootRouter from "./root/root.module";
import authRouter from "./auth/auth.module";
import linkRouter from "./link/link.module";

const router = combineRouters(rootRouter, authRouter, linkRouter);

export default router;
