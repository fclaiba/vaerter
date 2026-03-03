import {
  nextStage,
  previousStage,
  stageOrder,
  type CustomerCase,
  type CustomerPriority,
  type CustomerStage,
} from "@/app/admin/domain/crm";
import {
  createCampaignDraft,
  simulateCampaignRun,
  type CampaignRun,
  type MarketingCampaign,
} from "@/app/admin/domain/emailMarketing";

const STORAGE_KEY = "vaerter-admin-crm-store-v2";

export interface CrmStore {
  cases: CustomerCase[];
  campaigns: MarketingCampaign[];
  campaignRuns: CampaignRun[];
  updatedAt: string;
}

export interface CreateCampaignInput {
  name: string;
  targetStage: CustomerStage;
  subject: string;
  body: string;
  status: "draft" | "scheduled";
  scheduledFor?: string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  estimatedValue: number;
  priority: CustomerPriority;
  company?: string;
}

const seedNow = new Date().toISOString();

const seedCases: CustomerCase[] = [
  {
    id: "case-001",
    name: "Ana Torres",
    email: "ana@ateliernova.com",
    phone: "+54 9 221 401 8821",
    company: "Atelier Nova",
    stage: "lead",
    priority: "high",
    product: "Displays para vidriera",
    quantity: 18,
    estimatedValue: 420000,
    tags: ["retail", "diseno"],
    statusNote: "Solicito muestra de PETG.",
    nextAction: "Crear cotizacion inicial.",
    createdAt: seedNow,
    updatedAt: seedNow,
    lastContactedAt: seedNow,
  },
  {
    id: "case-002",
    name: "Matias Roldan",
    email: "matias.roldan@gmail.com",
    phone: "+54 9 11 6114 0021",
    stage: "quote",
    priority: "medium",
    product: "Prototipo soporte drone",
    quantity: 2,
    estimatedValue: 85000,
    tags: ["prototipo", "mecanico"],
    statusNote: "Cotizacion enviada, espera respuesta.",
    nextAction: "Follow-up comercial en 48h.",
    createdAt: seedNow,
    updatedAt: seedNow,
    lastContactedAt: seedNow,
  },
  {
    id: "case-003",
    name: "Lucia Benitez",
    email: "compras@factoriax.com",
    phone: "+54 9 11 5772 8431",
    company: "Factoria X",
    stage: "order",
    priority: "high",
    product: "Carcasas IoT",
    quantity: 120,
    estimatedValue: 2100000,
    tags: ["serie", "iot"],
    statusNote: "Pedido aprobado con anticipo.",
    nextAction: "Programar lote en produccion.",
    createdAt: seedNow,
    updatedAt: seedNow,
    lastContactedAt: seedNow,
  },
  {
    id: "case-004",
    name: "Cecilia Ocampo",
    email: "cecilia@nutriware.com",
    phone: "+54 9 341 511 1102",
    company: "Nutriware",
    stage: "production",
    priority: "high",
    product: "Lote envases prueba",
    quantity: 250,
    estimatedValue: 3750000,
    tags: ["serie", "packaging"],
    statusNote: "Produccion al 65%.",
    nextAction: "Confirmar fecha de despacho.",
    createdAt: seedNow,
    updatedAt: seedNow,
    lastContactedAt: seedNow,
  },
  {
    id: "case-005",
    name: "Paula Gimenez",
    email: "paula.gimenez@gmail.com",
    phone: "+54 9 221 520 6006",
    stage: "delivery",
    priority: "low",
    product: "Set decorativo hogar",
    quantity: 8,
    estimatedValue: 145000,
    tags: ["retail", "hogar"],
    statusNote: "Entrega confirmada y cerrada.",
    nextAction: "Solicitar feedback post-entrega.",
    createdAt: seedNow,
    updatedAt: seedNow,
    lastContactedAt: seedNow,
  },
];

function createSeedStore(): CrmStore {
  const draftCampaigns = stageOrder.map((stage, index) => ({
    id: `campaign-seed-${index + 1}`,
    ...createCampaignDraft(stage, seedNow),
  }));

  return {
    cases: seedCases,
    campaigns: draftCampaigns,
    campaignRuns: [],
    updatedAt: seedNow,
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): CrmStore {
  if (!isBrowser()) {
    return createSeedStore();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = createSeedStore();
    writeStore(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') throw new Error("Invalid format");
    if (!Array.isArray(parsed.cases) || !Array.isArray(parsed.campaigns) || !Array.isArray(parsed.campaignRuns)) {
      throw new Error("Corrupted arrays");
    }
    return parsed as CrmStore;
  } catch (error) {
    console.error("CRM Store corrupted, seeding fresh data:", error);
    const seeded = createSeedStore();
    writeStore(seeded);
    return seeded;
  }
}

function writeStore(store: CrmStore): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function updateStore(mutator: (current: CrmStore) => CrmStore): CrmStore {
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

export function getCrmStore(): CrmStore {
  return readStore();
}

export function resetCrmStore(): CrmStore {
  const seeded = createSeedStore();
  writeStore(seeded);
  return seeded;
}

export function getCasesByStage(stage: CustomerStage): CustomerCase[] {
  return getCrmStore().cases.filter((item) => item.stage === stage);
}

export function createLead(input: CreateLeadInput): CrmStore {
  return updateStore((current) => {
    const now = new Date().toISOString();
    const newCase: CustomerCase = {
      id: randomId("case"),
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      stage: "lead",
      priority: input.priority,
      product: input.product,
      quantity: input.quantity,
      estimatedValue: input.estimatedValue,
      tags: ["lead", "nuevo"],
      statusNote: "Lead creado manualmente desde admin.",
      nextAction: "Preparar cotizacion.",
      createdAt: now,
      updatedAt: now,
      lastContactedAt: now,
    };

    return {
      ...current,
      cases: [newCase, ...current.cases],
    };
  });
}

export function moveCustomerCase(caseId: string, stage: CustomerStage): CrmStore {
  return updateStore((current) => ({
    ...current,
    cases: current.cases.map((item) =>
      item.id === caseId
        ? {
          ...item,
          stage,
          updatedAt: new Date().toISOString(),
          nextAction:
            stage === "quote"
              ? "Enviar propuesta final."
              : stage === "order"
                ? "Coordinar inicio de produccion."
                : stage === "production"
                  ? "Monitorear avance de lote."
                  : stage === "delivery"
                    ? "Confirmar entrega y feedback."
                    : "Calificar lead y preparar propuesta.",
        }
        : item,
    ),
  }));
}

export function advanceCase(caseId: string): CrmStore {
  const item = getCrmStore().cases.find((candidate) => candidate.id === caseId);
  if (!item) return getCrmStore();
  const target = nextStage(item.stage);
  if (!target) return getCrmStore();
  return moveCustomerCase(caseId, target);
}

export function revertCase(caseId: string): CrmStore {
  const item = getCrmStore().cases.find((candidate) => candidate.id === caseId);
  if (!item) return getCrmStore();
  const target = previousStage(item.stage);
  if (!target) return getCrmStore();
  return moveCustomerCase(caseId, target);
}

export function updateCustomerCase(payload: CustomerCase): CrmStore {
  return updateStore((current) => ({
    ...current,
    cases: current.cases.map((item) =>
      item.id === payload.id
        ? {
          ...payload,
          updatedAt: new Date().toISOString(),
        }
        : item,
    ),
  }));
}

export function createCampaign(input: CreateCampaignInput): CrmStore {
  const now = new Date().toISOString();
  const newCampaign: MarketingCampaign = {
    id: randomId("campaign"),
    ...input,
    createdAt: now,
  };

  return updateStore((current) => ({
    ...current,
    campaigns: [newCampaign, ...current.campaigns],
  }));
}

export function executeCampaign(campaignId: string): CrmStore {
  return updateStore((current) => {
    const campaign = current.campaigns.find((item) => item.id === campaignId);
    if (!campaign) return current;

    const recipients = current.cases.filter(
      (item) => item.stage === campaign.targetStage,
    );
    const now = new Date().toISOString();
    const run = simulateCampaignRun(campaign, recipients, now);

    return {
      ...current,
      campaigns: current.campaigns.map((item) =>
        item.id === campaignId
          ? {
            ...item,
            status: "sent",
            lastRunAt: now,
          }
          : item,
      ),
      campaignRuns: [run, ...current.campaignRuns],
    };
  });
}
