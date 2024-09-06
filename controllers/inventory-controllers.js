import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const inventoryList = await knex("inventories")
      .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
      .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id");
    res.json(inventoryList);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "Error getting inventory list from database" });
  }
};

// const createInventoryItem = async (req, res) => {
//   try {
//     const { warehouse_id, item_name, description, category, status, quantity } =
//       req.body;
//     if (!Number.isInteger(quantity) || !Number.isInteger(warehouse_id)) {
//       res
//         .status(400)
//         .json({
//           error: `Quantity or warehouseId: ${quantity} or ${warehouse_id} is not an integer`,
//         });
//     } else if (
//       !item_name ||
//       !description ||
//       !category ||
//       !status ||
//       !warehouse_id
//     ) {
//       res.status(400).json({ error: `Some fields are missing ` });
//     } else {
//       const count = await knex("warehouses")
//         .select("id")
//         .where({ id: warehouse_id });
//       if (count.length === 0) {
//         res
//           .status(400)
//           .json({ error: `Warehouse id ${warehouse_id} does not exist` });
//       } else {
//         const inventoryItem = await knex("inventories").insert({
//           item_name,
//           description,
//           category,
//           status,
//           quantity,
//           warehouse_id,
//         });
//         res
//           .status(201)
//           .json({
//             id: inventoryItem[0],
//             warehouse_id: warehouse_id,
//             item_name: item_name,
//             description: description,
//             category: category,
//             status: status,
//             quantity: quantity,
//           });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ error: "Error creating a new inventory list" });
//   }
// };

const getInventoryItemById = async (req, res) => {
    const { warehouseId, inventoryId } = req.params;

        try {
        const inventoryItem = await knex("inventories")
        .select("inventories.*", "warehouses.warehouse_name")
        .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id")
        .where({
        "inventories.id": inventoryId,
        "inventories.warehouse_id": warehouseId,
        })
        .first();

        if (!inventoryItem) {
            return res
            .status(404)
            .json({ error: `Inventory item with id ${inventoryId} not found in warehouse ${warehouseId}` });
        }

        res.status(200).json(inventoryItem);
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error retrieving inventory item from database" });
        }
    };

const createInventoryItem = async (req, res)=>{
    try{
        const {warehouse_id, item_name, description, category, status, quantity} = req.body;
        if (!Number.isInteger(quantity) || !Number.isInteger(warehouse_id)){
            res.status(400).json({error: `Quantity or warehouseId: ${quantity} or ${warehouse_id} is not an integer`})
        }
        else if (!item_name || !description || !category || !status || !warehouse_id){
            res.status(400).json({error: `Some fields are missing `})
        }
        else {
            const count = await knex("warehouses").select("id").where({id:warehouse_id});
            if (count.length === 0){
                res.status(400).json({error: `Warehouse id ${warehouse_id} does not exist`})
            }
            else {
                const inventoryItem = await knex("inventories")
                .insert({item_name, description, category, status, quantity, warehouse_id});
                res.status(201).json({id:inventoryItem[0],warehouse_id:warehouse_id,
                    item_name:item_name,description:description,category:category,
                    status:status,quantity:quantity})
            }
        }

    } catch(err){
        console.log(err);
        res.status(400).json({error:"Error creating a new inventory list"});

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


export { index, createInventoryItem, getInventoryItemById, deleteInventoryById };
