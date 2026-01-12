export interface Device {
  id: string;
  signal_type: "wifi" | "cell";
}

export interface CreateDeviceDto {
  signal_type?: "wifi" | "cell";
}
