import { Router, Response } from "express";
import ProductController from "./Controllers/ProductController";
import PackController from "./Controllers/PackController";
import BulkUpdateController from "./Controllers/BulkUpdateController";
import { CSVParseToRows, CSVRowsToBulkUpdateItem } from "./middlewares/CSVParserMiddleware";



const routes = Router();

routes.get("/", (_, res: Response) => { return res.json("Hello!"); });

routes.get("/product/:code", ProductController.Read);
routes.get("/pack/:id", PackController.Read);

routes.post("/bulkupdate", CSVParseToRows, CSVRowsToBulkUpdateItem, BulkUpdateController.Validate);
routes.put("/bulkupdate", CSVParseToRows, CSVRowsToBulkUpdateItem, BulkUpdateController.Validate, BulkUpdateController.Update);

export default routes;
