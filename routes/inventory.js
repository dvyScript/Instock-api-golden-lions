import express from 'express';
import initKnex from "knex";
import configuration from "./../knexfile.js"
import * as inventoryController from '../controllers/inventory-controllers.js'

const router = express.Router();
const knex = initKnex(configuration);

router
    .get("/", inventoryController.index);

router
    .post("/", inventoryController.createInventoryItem);


export default router;
