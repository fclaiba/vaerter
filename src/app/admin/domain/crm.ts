export const stageOrder = [
  "lead",
  "quote",
  "order",
  "production",
  "delivery",
] as const;

export type CustomerStage = (typeof stageOrder)[number];

export type CustomerPriority = "low" | "medium" | "high";

export interface CustomerCase {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  stage: CustomerStage;
  priority: CustomerPriority;
  product: string;
  quantity: number;
  estimatedValue: number;
  tags: string[];
  statusNote: string;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
  lastContactedAt: string;
}

export interface StageMeta {
  key: CustomerStage;
  label: string;
  description: string;
}

export const stageMeta: StageMeta[] = [
  {
    key: "lead",
    label: "Leads",
    description: "Consultas nuevas y prospectos por calificar.",
  },
  {
    key: "quote",
    label: "Cotizaciones",
    description: "Presupuestos activos pendientes de aprobacion.",
  },
  {
    key: "order",
    label: "Pedidos",
    description: "Pedidos confirmados listos para iniciar produccion.",
  },
  {
    key: "production",
    label: "Produccion",
    description: "Lotes en fabricacion, control y terminacion.",
  },
  {
    key: "delivery",
    label: "Entregas",
    description: "Pedidos finalizados en despacho o entregados.",
  },
];

export function getStageLabel(stage: CustomerStage): string {
  return stageMeta.find((item) => item.key === stage)?.label ?? stage;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function stageProgressPercent(stage: CustomerStage): number {
  const index = stageOrder.indexOf(stage);
  return Math.round(((index + 1) / stageOrder.length) * 100);
}

export function canMoveBackward(stage: CustomerStage): boolean {
  return stageOrder.indexOf(stage) > 0;
}

export function canMoveForward(stage: CustomerStage): boolean {
  return stageOrder.indexOf(stage) < stageOrder.length - 1;
}

export function previousStage(stage: CustomerStage): CustomerStage | null {
  const index = stageOrder.indexOf(stage);
  if (index <= 0) return null;
  return stageOrder[index - 1];
}

export function nextStage(stage: CustomerStage): CustomerStage | null {
  const index = stageOrder.indexOf(stage);
  if (index >= stageOrder.length - 1) return null;
  return stageOrder[index + 1];
}
