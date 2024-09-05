import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getInventoryList = async (_req, res) => {
  try {
    const inventoryList = await knex("inventories")
      .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
      .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id");

    res.status(200).json(inventoryList);
  } catch (err) {
    res
      .status(400)
      .json({ message: "error getting inventory list from database" });
  }
};

const deleteInventoryById = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.inventoryId })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.inventoryId} not foound`,
      });
    }

    // no content response:
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${err}`,
    });
  }
};

export { getInventoryList, deleteInventoryById };
