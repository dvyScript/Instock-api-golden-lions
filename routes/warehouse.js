import express from "express";
import * as warehouseController from "../controllers/warehouse-controllers.js";
import { validateRequiredFields, validateEmailAndPhone } from "../middleware/middleware.js";

const router = express.Router();

router
    .get('/:warehouseId', warehouseController.getSingleWarehouse)
    .get("/:id/inventories", warehouseController.getInventoriesWithWarehouseId)
    .get("/", warehouseController.index)
    .delete('/:warehouseId', warehouseController.deleteWarehouse)
    .put('/:warehouseId', validateRequiredFields, validateEmailAndPhone, warehouseController.editWarehouse)
    .post('/', validateRequiredFields, validateEmailAndPhone, warehouseController.addWarehouse);

export default router;
