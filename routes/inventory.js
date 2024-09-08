import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";

const router = express.Router();


router
    .get("/", inventoryController.index)
    .get('/:inventoryId', inventoryController.getInventoryItemById)
    .post("/", inventoryController.createInventoryItem)
    .put('/:inventoryId', inventoryController.editInventoryItem)
    .delete("/:inventoryId", inventoryController.deleteInventoryById);


export default router;