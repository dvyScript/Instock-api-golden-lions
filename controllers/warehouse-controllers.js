import initKnex from "knex";
import configuration from "./../knexfile.js";

const knex = initKnex(configuration);

const deleteWarehouse = async (req, res) => {
    try {
        const { warehouseID } = req.params;

        const warehouse = await knex('warehouses').where({ id: warehouseID }).first();

        if (!warehouse) {
            return res.status(404).send('Warehouse not found');
        }

        await knex('warehouses')
            .where({ id: warehouseID })
            .del()

        res.status(204).send
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Unable to delete warehouse'})
    }
}

export {
    deleteWarehouse
}
