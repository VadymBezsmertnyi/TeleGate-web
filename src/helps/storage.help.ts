export function setDeviceStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (_error) {
    return false;
  }
}

export function getDeviceStorage(key: string): string | null {
  try {
    const result = localStorage.getItem(key);
    return result;
  } catch (_error) {
    return null;
  }
}

export function deleteDeviceStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (_error) {
    return false;
  }
}
