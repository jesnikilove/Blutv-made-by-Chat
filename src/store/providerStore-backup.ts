export interface Provider {
  id: string;
  name: string;
  type: "xtream" | "m3u";
  server?: string;
  username?: string;
  password?: string;
  playlist?: string;
  active?: boolean;
}

const KEY = "blutv_providers";

export function getProviders(): Provider[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveProviders(providers: Provider[]) {
  localStorage.setItem(KEY, JSON.stringify(providers));
}

export function addProvider(provider: Provider) {
  const providers = getProviders();
  providers.push(provider);
  saveProviders(providers);
}

export function setActiveProvider(id: string) {
  const providers = getProviders().map(p => ({
    ...p,
    active: p.id === id
  }));

  saveProviders(providers);
}

export function getActiveProvider() {
  return getProviders().find(p => p.active);
}
