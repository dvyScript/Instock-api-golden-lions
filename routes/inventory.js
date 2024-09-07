import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";
import initKnex from "knex";
import configuration from "./../knexfile.js";

const router = express.Router();

router
    .get("/", inventoryController.index)
    .post("/", inventoryController.createInventoryItem)
    .delete("/:inventoryId", inventoryController.deleteInventoryById);

export default router;
