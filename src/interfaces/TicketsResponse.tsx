export interface Ticket {
  id: string;
  number: number;
  agente: string;
  escritorio: string;
}

export interface LastTickets {
  ok: boolean;
  ultimos: Ticket[];
}
