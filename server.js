import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import inventoryRouter from './routes/inventory.js';
import warehousesRouter from './routes/warehouse.js';

const app = express();
const{ PORT } = process.env;

app.use(cors());
app.use(express.json()); 

app.use('/inventories', inventoryRouter);

app.use('/warehouses', warehousesRouter);

app.use('/', (_req, res) => {
    res.send("Hello API routes!!!");
});

app.use((err, _req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error'});
})

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
})
