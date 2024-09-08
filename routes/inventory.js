import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";
import initKnex from "knex";
import configuration from "./../knexfile.js";

const router = express.Router();

const knex = initKnex(configuration);

router
    .get("/", inventoryController.index)
    .get('/:inventoryId', inventoryController.getInventoryItemById)
    .post("/", inventoryController.createInventoryItem)
    .put('/:inventoryId', inventoryController.editInventoryItem)
    .delete("/:inventoryId", inventoryController.deleteInventoryById);


export default router;
