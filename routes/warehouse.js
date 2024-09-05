import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import * as warehouseController from "../controllers/warehouse-controllers.js";

const router = express.Router();
const knex = initKnex(configuration);

router
    .get("/", warehouseController.index);

router
    .get("/:id/inventories", warehouseController.getInventoriesWithWarehouseId)

router
    .delete('/:warehouseId', warehouseController.deleteWarehouse)

export default router;
