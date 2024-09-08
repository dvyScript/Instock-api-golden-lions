import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const colName = _req.query.sort_by || 'id';
    const orderBy = _req.query.order_by === 'desc' ? 'desc' : 'asc'; 

    const inventoryList = await knex("inventories")
      .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
      .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id")
      .orderBy(colName, orderBy);
    res.status(200).json(inventoryList);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "Error getting inventory list from database" });
  }
};

const getInventoryItemById = async (req, res) => {
  const { inventoryId } = req.params;

  try {
    const inventoryItem = await knex("inventories")
      .where({
        id: inventoryId
      })
      .first();

    if (!inventoryItem) {
      return res
        .status(404)
        .json({ error: `Inventory item with id ${inventoryId} ` });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving inventory item from database" });
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;
    if (!Number.isInteger(quantity) || !Number.isInteger(warehouse_id)) {
      res.status(400).json({ error: `Quantity or warehouseId: ${quantity} or ${warehouse_id} is not an integer` })
    }
    else if (!item_name || !description || !category || !status || !warehouse_id) {
      res.status(400).json({ error: `Some fields are missing ` })
    }
    else {
      const count = await knex("warehouses").select("id").where({ id: warehouse_id });
      if (count.length === 0) {
        res.status(400).json({ error: `Warehouse id ${warehouse_id} does not exist` })
      }
      else {
        const inventoryItem = await knex("inventories")
          .insert({ item_name, description, category, status, quantity, warehouse_id });
        res.status(201).json({
          id: inventoryItem[0], warehouse_id: warehouse_id,
          item_name: item_name, description: description, category: category,
          status: status, quantity: quantity
        })
      }
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error creating a new inventory list" });
  }
}

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

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${err}`,
    });
  }
};

const editInventoryItem = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const updatedItem = req.body;

    if (
      updatedItem.item_name === undefined ||
      updatedItem.description === undefined ||
      updatedItem.category === undefined ||
      updatedItem.status === undefined ||
      updatedItem.quantity === undefined ||
      updatedItem.warehouse_id === undefined
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const warehouse = await knex('warehouses').where({ id: updatedItem.warehouse_id }).first();
    if(!warehouse){
      return res.status(400).json({ message: `There is no warehouse with the id ${updatedItem.warehouse_id}` })
    }

    const item = await knex('inventories').where({ id: inventoryId }).first();
    if (!item) {
      return res.status(404).json({ message: `There is no item with the id ${inventoryId}` })
    }

    const quantity = (updatedItem.quantity);

    if (!Number.isInteger(quantity)) {
      return res.status(400).json({ message: `Quantity must be a number it currently is a ${typeof updatedItem.quantity}` })
    }

    await knex('inventories')
      .where({ id: inventoryId })
      .update({
        warehouse_id: updatedItem.warehouse_id,
        item_name: updatedItem.item_name,
        description: updatedItem.description,
        category: updatedItem.category,
        status: updatedItem.status,
        quantity: updatedItem.quantity,
        updated_at: knex.fn.now()
      })
    res.status(200).json({ message: 'Inventory item updated successfully', item: updatedItem })
  } catch (error) {
    console.error('error updating inventory item:', error)
    res.status(500).json({ message: 'failed to update inventory item' })
  }
}

export { index, createInventoryItem, getInventoryItemById, deleteInventoryById, editInventoryItem }
