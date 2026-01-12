import { Knex } from "knex";

export class DeviceService {
  constructor(private readonly db: Knex) {}

  async getAllDevices() {
    return this.db("devices").select("*");
  }

  async createDevice() {
    return this.db("devices").insert({}).returning("*");
  }
}
