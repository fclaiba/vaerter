import type { CustomerCase, CustomerStage } from "./crm";

export type CampaignStatus = "draft" | "scheduled" | "sent";
export type EmailEventStatus = "queued" | "sent" | "opened" | "clicked";

export interface StageTemplate {
  stage: CustomerStage;
  title: string;
  subject: string;
  body: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  targetStage: CustomerStage;
  subject: string;
  body: string;
  status: CampaignStatus;
  createdAt: string;
  scheduledFor?: string;
  lastRunAt?: string;
}

export interface CampaignRun {
  id: string;
  campaignId: string;
  campaignName: string;
  stage: CustomerStage;
  executedAt: string;
  audienceSize: number;
  sent: number;
  opened: number;
  clicked: number;
  conversionRate: number;
}

export const stageTemplates: StageTemplate[] = [
  {
    stage: "lead",
    title: "Bienvenida y descubrimiento",
    subject: "Te ayudamos a cotizar tu proyecto 3D en 24h",
    body: "Hola {{name}}, gracias por consultar. Contanos detalles de uso, material y cantidad para enviarte una propuesta personalizada.",
  },
  {
    stage: "quote",
    title: "Seguimiento de cotizacion",
    subject: "Tu cotizacion esta lista para revision",
    body: "Hola {{name}}, ya preparamos tu cotizacion. Si necesitas ajustes de material, cantidad o plazos podemos actualizarla hoy mismo.",
  },
  {
    stage: "order",
    title: "Confirmacion de pedido",
    subject: "Pedido confirmado: inicio de plan operativo",
    body: "Hola {{name}}, tu pedido fue confirmado. Te compartimos resumen de alcance, tiempos y proximos hitos de produccion.",
  },
  {
    stage: "production",
    title: "Actualizacion de produccion",
    subject: "Tu pedido esta en produccion",
    body: "Hola {{name}}, estamos fabricando tu pedido. Te enviaremos novedades de avance y fecha estimada de despacho.",
  },
  {
    stage: "delivery",
    title: "Post-entrega y fidelizacion",
    subject: "Tu pedido fue entregado: nos interesa tu feedback",
    body: "Hola {{name}}, gracias por confiar en VAERTER. Queremos conocer tu experiencia y ofrecerte beneficios para tu siguiente pedido.",
  },
];

export function templateForStage(stage: CustomerStage): StageTemplate {
  return (
    stageTemplates.find((template) => template.stage === stage) ??
    stageTemplates[0]
  );
}

export function createCampaignDraft(
  stage: CustomerStage,
  nowIso: string,
): Omit<MarketingCampaign, "id"> {
  const template = templateForStage(stage);
  return {
    name: template.title,
    targetStage: stage,
    subject: template.subject,
    body: template.body,
    status: "draft",
    createdAt: nowIso,
  };
}

function stableRatio(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash);
  return (positive % 1000) / 1000;
}

export function simulateCampaignRun(
  campaign: MarketingCampaign,
  recipients: CustomerCase[],
  nowIso: string,
): CampaignRun {
  const audienceSize = recipients.length;
  let opened = 0;
  let clicked = 0;

  recipients.forEach((recipient) => {
    const openRatio = stableRatio(`${campaign.id}-${recipient.id}-open`);
    const clickRatio = stableRatio(`${campaign.id}-${recipient.id}-click`);

    if (openRatio > 0.25) opened += 1;
    if (clickRatio > 0.55) clicked += 1;
  });

  const sent = audienceSize;
  const conversionRate = sent > 0 ? Number(((clicked / sent) * 100).toFixed(1)) : 0;

  return {
    id: `${campaign.id}-run-${nowIso}`,
    campaignId: campaign.id,
    campaignName: campaign.name,
    stage: campaign.targetStage,
    executedAt: nowIso,
    audienceSize,
    sent,
    opened,
    clicked,
    conversionRate,
  };
}

export function aggregateCampaignPerformance(runs: CampaignRun[]) {
  const totals = runs.reduce(
    (acc, run) => {
      acc.sent += run.sent;
      acc.opened += run.opened;
      acc.clicked += run.clicked;
      return acc;
    },
    { sent: 0, opened: 0, clicked: 0 },
  );

  const openRate = totals.sent > 0 ? Number(((totals.opened / totals.sent) * 100).toFixed(1)) : 0;
  const clickRate = totals.sent > 0 ? Number(((totals.clicked / totals.sent) * 100).toFixed(1)) : 0;

  return {
    ...totals,
    openRate,
    clickRate,
  };
}
