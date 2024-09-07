import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import * as warehouseController from "../controllers/warehouse-controllers.js";
import { getInventoryItemById } from '../controllers/inventory-controllers.js';

const router = express.Router();
const knex = initKnex(configuration);

router
    .get('/:id', warehouseController.getSingleWarehouse)
    .get("/:id/inventories", warehouseController.getInventoriesWithWarehouseId)
    .get("/", warehouseController.index)
    .get('/:warehouseId/inventories/:inventoryId', getInventoryItemById)
    .delete('/:warehouseId', warehouseController.deleteWarehouse)
    .put('/:warehouseId', warehouseController.editWarehouse)
    .post('/', warehouseController.addWarehouse);
    
export default router;
