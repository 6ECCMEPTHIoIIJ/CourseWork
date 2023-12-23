import { Dispatch, createContext } from "react";

export type TicketAnswerContextParams = [
    string[],
    Dispatch<string[]>,
    number,
    Dispatch<number>,
    Set<number>,
    Dispatch<Set<number>>
];

export const TicketAnswerContext = createContext<TicketAnswerContextParams>({} as TicketAnswerContextParams);
