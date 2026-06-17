const BUFFER_KEY = "blutv_buffer";
const RECONNECT_KEY = "blutv_reconnect";

export function getBufferLevel() {
  return localStorage.getItem(BUFFER_KEY) || "medium";
}

export function setBufferLevel(level: string) {
  localStorage.setItem(BUFFER_KEY, level);
}

export function getReconnect() {
  return localStorage.getItem(RECONNECT_KEY) === "true";
}

export function setReconnect(value: boolean) {
  localStorage.setItem(RECONNECT_KEY, String(value));
}
