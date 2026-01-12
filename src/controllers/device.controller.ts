import { DeviceService } from "../services/device.service";
import { Device, CreateDeviceDto } from "../types/device.types";

export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  async getAllDevices(): Promise<Device[]> {
    return this.deviceService.getAllDevices();
  }

  async createDevice(): Promise<Device> {
    return this.deviceService.createDevice();
  }

  async setTestDevice(id: string): Promise<Device | null> {
    return this.deviceService.setTestDevice(id);
  }

  async updateSignalType(
    id: string,
    signal_type: "wifi" | "cell"
  ): Promise<Device | null> {
    return this.deviceService.updateSignalType(id, signal_type);
  }

  async getTestDevice(): Promise<Device | null> {
    return this.deviceService.getTestDevice();
  }

  async setTestDeviceSignalType(
    signal_type: "wifi" | "cell"
  ): Promise<Device | null> {
    return this.deviceService.setTestDeviceSignalType(signal_type);
  }
}
