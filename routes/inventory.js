import express from 'express';
import initKnex from "knex";
import configuration from "./../knexfile.js"
import * as inventoryController from '../controllers/inventory-controllers.js'

const router = express.Router();
const knex = initKnex(configuration);

router.use('/', async (req, res)=>{
    try{
        const inventoryList = await knex("inventories")
        .select("inventories.*","warehouses.warehouse_name as warehouse_name")
        .leftJoin("warehouses","inventories.warehouse_id","warehouses.id");
        res.json(inventoryList);
    } catch (err){
        console.log(err);
        res.json({message:"error getting inventory list from database"});
    }
});



export default router;
