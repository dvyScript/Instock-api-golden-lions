import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";

const router = express.Router();

const knex = initKnex(configuration);

router
    .get("/", inventoryController.index)
    .post("/", inventoryController.createInventoryItem)
    .delete("/:inventoryId", inventoryController.deleteInventoryById);

export default router;
