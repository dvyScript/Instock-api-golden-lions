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

const getInventoriesWithWarehouseId = async (req, res) => {
    try {
        const inventoryList = await knex("inventories")
            .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
            .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id")
            .where({ warehouse_id: req.params.id, });

        if (inventoryList.length === 0) {
            res.status(404).json({
                error: `Error getting inventory list, warehouse id: ${req.params.id} does not exist`,
            });
        } else {
            res.status(200).json(inventoryList);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `Error getting inventory list given warehouse id:${req.params.id} from database`,
        });
    }
};

const getSingleWarehouse = async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const warehouse = await knex("warehouses").where({ id: warehouseId }).first();

        if (!warehouse) {
            return res.status(404).json({ message: `Warehouse with ID ${warehouseId} not found` });
        }

        res.status(200).json(warehouse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Failed to retrieve warehouse: ${err}` });
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

const editWarehouse = async (req, res) => {
    try {
        const warehouseId = req.params.warehouseId;
        const {
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_phone,
            contact_email
        } = req.body;

        if (
            !warehouse_name ||
            !address ||
            !city ||
            !country ||
            !contact_name ||
            !contact_position ||
            !contact_phone ||
            !contact_email
        ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const warehouse = await knex('warehouses')
            .where({ id: warehouseId })
            .first();

        if (!warehouse) {
            return res.status(404).json({ message: `There is no warehouse with the id ${warehouseId}` })
        }

        await knex('warehouses')
            .where({ id: warehouseId })
            .update({
                warehouse_name,
                address,
                city,
                country,
                contact_name,
                contact_position,
                contact_phone,
                contact_email,
                updated_at: knex.fn.now()
            });

        const editedWarehouse = await knex('warehouses')
            .where({ id: warehouseId })
            .first();

        return res.status(200).json(editedWarehouse);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `Error updating warehouse with id ${warehouseId} in the database`,
        });
    }
};
export {
    index,
    getInventoriesWithWarehouseId,
    getSingleWarehouse,
    deleteWarehouse,
    editWarehouse
}
