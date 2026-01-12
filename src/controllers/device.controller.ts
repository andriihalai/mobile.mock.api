import { DeviceService } from "../services/device.service";

export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  async getAllDevices() {
    return this.deviceService.getAllDevices();
  }

  async createDevice() {
    return this.deviceService.createDevice();
  }
}
