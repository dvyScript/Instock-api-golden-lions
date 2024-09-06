import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import * as warehouseController from "../controllers/warehouse-controllers.js";
import { getInventoryItemById } from '../controllers/inventory-controllers.js';

const router = express.Router();
const knex = initKnex(configuration);

router
    .get("/", warehouseController.index);

router
    .get("/:id/inventories", warehouseController.getInventoriesWithWarehouseId)

router.get('/:warehouseId/inventories/:inventoryId', getInventoryItemById);

router
    .get('/:id', warehouseController.getSingleWarehouse); 

router
    .delete('/:warehouseId', warehouseController.deleteWarehouse)

export default router;
