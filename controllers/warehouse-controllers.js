import initKnex from "knex";
import configuration from "../knexfile.js";

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

export { index };
