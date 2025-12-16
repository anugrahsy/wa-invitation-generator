export interface Guest {
  id: string;
  name: string;
  phone: string;
  status: 'pending' | 'sending' | 'sent' | 'failed';
}

export interface Template {
  id: number;
  label: string;
  content: string;
}

export enum AppStep {
  SLUG_INPUT = 0,
  GUEST_INPUT = 1,
  TEMPLATE_SELECTION = 2,
  PREVIEW = 3,
  SENDING = 4,
}

export interface SimulationConfig {
  minDelay: number;
  maxDelay: number;
}
