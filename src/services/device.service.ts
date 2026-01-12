import { Knex } from "knex";
import { Device, CreateDeviceDto } from "../types/device.types";

export class DeviceService {
  constructor(private readonly db: Knex) {}

  async getAllDevices(): Promise<Device[]> {
    return this.db("devices").select("*");
  }

  async createDevice(): Promise<Device> {
    const [device] = await this.db("devices").insert({}).returning("*");
    return device;
  }

  async setTestDevice(id: string): Promise<Device | null> {
    const [device] = await this.db("devices")
      .update({ is_test_device: true })
      .where({ id })
      .returning("*");
    return device || null;
  }

  async updateSignalType(
    id: string,
    signal_type: "wifi" | "cell"
  ): Promise<Device | null> {
    const [device] = await this.db("devices")
      .update({ signal_type })
      .where({ id })
      .returning("*");
    return device || null;
  }

  async getTestDevice(): Promise<Device | null> {
    return this.db("devices").where({ is_test_device: true }).first();
  }

  async setTestDeviceSignalType(
    signal_type: "wifi" | "cell"
  ): Promise<Device | null> {
    const [device] = await this.db("devices")
      .update({ signal_type })
      .where({ is_test_device: true })
      .returning("*");
    return device || null;
  }
}
