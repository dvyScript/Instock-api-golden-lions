import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";

const router = express.Router();

const knex = initKnex(configuration);

router
    .get("/", inventoryController.index);

router
    .post("/", inventoryController.createInventoryItem);

router.get("/", inventoryController.index);
router.post("/", inventoryController.createInventoryItem);
router.delete("/:inventoryId", inventoryController.deleteInventoryById);

export default router;
