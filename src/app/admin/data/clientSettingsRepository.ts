const STORAGE_KEY = "vaerter-admin-client-settings-v1";

export type ClientSegment = "retail" | "wholesale" | "enterprise";
export type ClientStatus = "active" | "inactive" | "blocked";

export interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  segment: ClientSegment;
  status: ClientStatus;
  ordersCount: number;
  lifetimeValue: number;
  lastOrderAt?: string;
  marketingOptIn: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  business: {
    companyName: string;
    contactEmail: string;
    contactPhone: string;
    timezone: string;
    currency: string;
  };
  notifications: {
    salesAlerts: boolean;
    productionAlerts: boolean;
    deliveryAlerts: boolean;
    dailySummary: boolean;
  };
  pipeline: {
    autoAdvanceFromQuote: boolean;
    quoteSlaHours: number;
    productionSlaDays: number;
    deliverySlaDays: number;
  };
  emailMarketing: {
    defaultSenderName: string;
    defaultSenderEmail: string;
    enableStageAutomations: boolean;
    openRateGoal: number;
    clickRateGoal: number;
  };
  analytics: {
    refreshIntervalMin: number;
    includeArchivedClients: boolean;
    defaultDateRange: "7d" | "30d" | "90d";
  };
}

export interface ClientSettingsStore {
  clients: ClientRecord[];
  settings: AppSettings;
  settingsHistory: SettingsSnapshot[];
  updatedAt: string;
}

export interface SettingsSnapshot {
  id: string;
  changedAt: string;
  source: "manual_save" | "import" | "restore_defaults" | "restore_snapshot";
  settings: AppSettings;
}

export interface CreateClientInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  segment: ClientSegment;
  marketingOptIn: boolean;
  notes?: string;
}

const nowIso = new Date().toISOString();

const seedClients: ClientRecord[] = [
  {
    id: "client-001",
    name: "Ana Torres",
    email: "ana@ateliernova.com",
    phone: "+54 9 221 401 8821",
    company: "Atelier Nova",
    segment: "wholesale",
    status: "active",
    ordersCount: 3,
    lifetimeValue: 1280000,
    lastOrderAt: nowIso,
    marketingOptIn: true,
    notes: "Cliente recurrente con foco en retail visual.",
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: "client-002",
    name: "Lucia Benitez",
    email: "compras@factoriax.com",
    phone: "+54 9 11 5772 8431",
    company: "Factoria X",
    segment: "enterprise",
    status: "active",
    ordersCount: 5,
    lifetimeValue: 4200000,
    lastOrderAt: nowIso,
    marketingOptIn: true,
    notes: "Cuenta estrategica B2B.",
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: "client-003",
    name: "Paula Gimenez",
    email: "paula.gimenez@gmail.com",
    phone: "+54 9 221 520 6006",
    segment: "retail",
    status: "inactive",
    ordersCount: 1,
    lifetimeValue: 145000,
    marketingOptIn: false,
    notes: "Cliente eventual de bajo volumen.",
    createdAt: nowIso,
    updatedAt: nowIso,
  },
];

const seedSettings: AppSettings = {
  business: {
    companyName: "VAERTER",
    contactEmail: "comercial@vaerter.com",
    contactPhone: "+54 9 221 300 0000",
    timezone: "America/Argentina/Buenos_Aires",
    currency: "ARS",
  },
  notifications: {
    salesAlerts: true,
    productionAlerts: true,
    deliveryAlerts: true,
    dailySummary: true,
  },
  pipeline: {
    autoAdvanceFromQuote: false,
    quoteSlaHours: 48,
    productionSlaDays: 5,
    deliverySlaDays: 2,
  },
  emailMarketing: {
    defaultSenderName: "Equipo VAERTER",
    defaultSenderEmail: "noreply@vaerter.com",
    enableStageAutomations: true,
    openRateGoal: 35,
    clickRateGoal: 12,
  },
  analytics: {
    refreshIntervalMin: 15,
    includeArchivedClients: false,
    defaultDateRange: "30d",
  },
};

function createSeedStore(): ClientSettingsStore {
  const snapshot: SettingsSnapshot = {
    id: "snapshot-seed",
    changedAt: nowIso,
    source: "restore_defaults",
    settings: seedSettings,
  };

  return {
    clients: seedClients,
    settings: seedSettings,
    settingsHistory: [snapshot],
    updatedAt: nowIso,
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): ClientSettingsStore {
  if (!isBrowser()) return createSeedStore();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = createSeedStore();
    writeStore(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ClientSettingsStore>;
    if (!parsed || typeof parsed !== 'object') throw new Error("Invalid format");
    if (parsed.clients && !Array.isArray(parsed.clients)) throw new Error("Corrupted clients array");
    if (parsed.settingsHistory && !Array.isArray(parsed.settingsHistory)) throw new Error("Corrupted history array");

    return {
      clients: parsed.clients ?? seedClients,
      settings: parsed.settings ?? seedSettings,
      settingsHistory: parsed.settingsHistory ?? [],
      updatedAt: parsed.updatedAt ?? nowIso,
    };
  } catch (error) {
    console.error("Client Settings Store corrupted, seeding fresh data:", error);
    const seeded = createSeedStore();
    writeStore(seeded);
    return seeded;
  }
}

function writeStore(store: ClientSettingsStore): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function updateStore(
  mutator: (current: ClientSettingsStore) => ClientSettingsStore,
): ClientSettingsStore {
  const current = readStore();
  const updated = {
    ...mutator(current),
    updatedAt: new Date().toISOString(),
  };
  writeStore(updated);
  return updated;
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function appendSnapshot(
  current: ClientSettingsStore,
  source: SettingsSnapshot["source"],
  settings: AppSettings,
): SettingsSnapshot[] {
  const snapshot: SettingsSnapshot = {
    id: randomId("snapshot"),
    changedAt: new Date().toISOString(),
    source,
    settings,
  };

  return [snapshot, ...(current.settingsHistory ?? [])].slice(0, 20);
}

export function getClientSettingsStore(): ClientSettingsStore {
  return readStore();
}

export function resetClientSettingsStore(): ClientSettingsStore {
  const seeded = createSeedStore();
  writeStore(seeded);
  return seeded;
}

export function createClient(input: CreateClientInput): ClientSettingsStore {
  return updateStore((current) => {
    const now = new Date().toISOString();
    const client: ClientRecord = {
      id: randomId("client"),
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      segment: input.segment,
      status: "active",
      ordersCount: 0,
      lifetimeValue: 0,
      marketingOptIn: input.marketingOptIn,
      notes: input.notes ?? "",
      createdAt: now,
      updatedAt: now,
    };

    return {
      ...current,
      clients: [client, ...current.clients],
    };
  });
}

export function updateClient(client: ClientRecord): ClientSettingsStore {
  return updateStore((current) => ({
    ...current,
    clients: current.clients.map((item) =>
      item.id === client.id
        ? {
          ...client,
          updatedAt: new Date().toISOString(),
        }
        : item,
    ),
  }));
}

export function setClientStatus(
  clientId: string,
  status: ClientStatus,
): ClientSettingsStore {
  return updateStore((current) => ({
    ...current,
    clients: current.clients.map((item) =>
      item.id === clientId
        ? {
          ...item,
          status,
          updatedAt: new Date().toISOString(),
        }
        : item,
    ),
  }));
}

export function deleteClient(clientId: string): ClientSettingsStore {
  return updateStore((current) => ({
    ...current,
    clients: current.clients.filter((item) => item.id !== clientId),
  }));
}

export function updateAppSettings(
  settingsPatch: Partial<AppSettings>,
): ClientSettingsStore {
  return updateStore((current) => {
    const merged: AppSettings = {
      ...current.settings,
      ...settingsPatch,
      business: {
        ...current.settings.business,
        ...(settingsPatch.business ?? {}),
      },
      notifications: {
        ...current.settings.notifications,
        ...(settingsPatch.notifications ?? {}),
      },
      pipeline: {
        ...current.settings.pipeline,
        ...(settingsPatch.pipeline ?? {}),
      },
      emailMarketing: {
        ...current.settings.emailMarketing,
        ...(settingsPatch.emailMarketing ?? {}),
      },
      analytics: {
        ...current.settings.analytics,
        ...(settingsPatch.analytics ?? {}),
      },
    };

    return {
      ...current,
      settings: merged,
      settingsHistory: appendSnapshot(current, "manual_save", merged),
    };
  });
}

export function replaceAppSettings(
  settings: AppSettings,
  source: SettingsSnapshot["source"] = "manual_save",
): ClientSettingsStore {
  return updateStore((current) => ({
    ...current,
    settings,
    settingsHistory: appendSnapshot(current, source, settings),
  }));
}

export function getSettingsHistory(): SettingsSnapshot[] {
  return getClientSettingsStore().settingsHistory;
}

export function restoreSettingsSnapshot(snapshotId: string): ClientSettingsStore {
  return updateStore((current) => {
    const snapshot = current.settingsHistory.find((entry) => entry.id === snapshotId);
    if (!snapshot) return current;
    return {
      ...current,
      settings: snapshot.settings,
      settingsHistory: appendSnapshot(
        current,
        "restore_snapshot",
        snapshot.settings,
      ),
    };
  });
}
