import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, json } from "express";
import { db } from "./knex";
import { DeviceController } from "./controllers/device.controller";
import { DeviceService } from "./services/device.service";

const app = express();
app.use(json());

const deviceService = new DeviceService(db);
const deviceController = new DeviceController(deviceService);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express");
});

app.get("/devices", async (req: Request, res: Response) => {
  try {
    const devices = await deviceController.getAllDevices();
    res.json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/devices", async (req: Request, res: Response) => {
  try {
    const result = await deviceController.createDevice();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch(
  "/devices/set-test-device/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await deviceController.setTestDevice(id as string);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Device not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.patch(
  "/devices/update-signal-type/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { signal_type } = req.body;
      const result = await deviceController.updateSignalType(
        id as string,
        signal_type
      );
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Device not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/getTestDevice", async (req: Request, res: Response) => {
  try {
    const result = await deviceController.getTestDevice();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/setTestDeviceSignalType", async (req: Request, res: Response) => {
  try {
    const { signal_type } = req.body;
    const result = await deviceController.setTestDeviceSignalType(signal_type);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.APP_PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    await db.destroy();
    console.log("Database connections closed");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  server.close(async () => {
    await db.destroy();
    console.log("Database connections closed");
    process.exit(0);
  });
});
