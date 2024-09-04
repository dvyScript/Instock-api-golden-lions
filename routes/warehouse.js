import express from 'express';
import initKnex from "knex";
import configuration from "./../knexfile.js"
import * as warehouseController from '../controllers/warehouse-controllers.js'


const router = express.Router();
const knex = initKnex(configuration);

router.use('/:id/inventories', async (req, res)=>{
    try{
        const inventoryList = await knex("inventories")
        .where({ warehouse_id: req.params.id });
        res.json(inventoryList);
    } catch (err){
        console.log(err);
        res.json({message:`error getting inventory list given warehouse id:${req.params.id} from database`});
    }
});


export default router;
