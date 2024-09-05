import initKnex from "knex";
import configuration from "./../knexfile.js";

const knex = initKnex(configuration);

// default entry: root
const index = async (_req, res) => {
    try {
        const allWarehouses = await knex("warehouses");
        res.status(200).json(allWarehouses);
    } catch (err) {
        console.log(err);
        res
            .status(400)
            .json({ message: `Failed to retrieve all warehouses: ${err}` });
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        console.log(req.params.warehouseId)
        const selectedWarehouse = req.params.warehouseId;
        const warehouse = await knex("warehouses").where({ id: selectedWarehouse }).first();

        if (!warehouse) {
            return res.status(404).send('Warehouse not found');
        }


        await knex('warehouses')
            .where({ id: selectedWarehouse })
            .del()

        res.status(204).send(warehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete warehouse' })
    }
}

export {
    index ,
    deleteWarehouse
}
