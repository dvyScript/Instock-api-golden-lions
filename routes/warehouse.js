import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import * as warehouseController from "../controllers/warehouse-controllers.js";
import { getInventoryItemById } from '../controllers/inventory-controllers.js';
import { validateRequiredFields, validateEmailAndPhone } from "../middleware/middleware.js";

const router = express.Router();
const knex = initKnex(configuration);

router
    .get('/:id', warehouseController.getSingleWarehouse)
    .get("/:id/inventories", warehouseController.getInventoriesWithWarehouseId)
    .get("/", warehouseController.index)
    .delete('/:warehouseId', warehouseController.deleteWarehouse)
    .put('/:warehouseId', validateRequiredFields, validateEmailAndPhone, warehouseController.editWarehouse)
    .post('/', validateRequiredFields, validateEmailAndPhone, warehouseController.addWarehouse);
    
export default router;
