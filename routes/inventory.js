import express from "express";
import * as inventoryController from "../controllers/inventory-controllers.js";

const router = express.Router();

router.get("/", inventoryController.getInventoryList);
router.delete("/:inventoryId", inventoryController.deleteInventoryById);

export default router;
