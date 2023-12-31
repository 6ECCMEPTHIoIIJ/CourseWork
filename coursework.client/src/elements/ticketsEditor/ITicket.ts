﻿import { UUID } from "crypto";

export interface ITicket {
    id: UUID;
    type: number;
    data: ITicketData;
    answer: ITicketAnswer;
}

export interface ITicketData {
    question: string;
    description: string;
    cost: number;
}

export interface ITicketAnswer {
    variants: string[];
    single: number;
    multiple: number[];
    input: string;
}

export default ITicket;