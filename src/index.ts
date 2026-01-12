import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, json } from "express";
import { db } from "./knex";
import { DeviceController } from "./controllers/device.controller";
import { DeviceService } from "./services/device.service";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express");
});

app.get("/devices", async (req: Request, res: Response) => {
  try {
    const service = new DeviceService(db);
    const controller = new DeviceController(service);

    const devices = await controller.getAllDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/devices", json(), async (req: Request, res: Response) => {
  try {
    const service = new DeviceService(db);
    const controller = new DeviceController(service);

    const result = await controller.createDevice();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
});
