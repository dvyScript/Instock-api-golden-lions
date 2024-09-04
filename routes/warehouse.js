import express from 'express';
import * as warehouseController from '../controllers/warehouse-controllers.js'


const router = express.Router();

router
    .delete('/warehouses/:warehouseId', warehouseController.deleteWarehouse);


export default router;
