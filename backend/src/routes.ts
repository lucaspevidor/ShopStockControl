import { Router, Response } from "express";

const routes = Router();

routes.get("/", (_, res: Response) => { return res.json("Hello!"); });

export default routes;
