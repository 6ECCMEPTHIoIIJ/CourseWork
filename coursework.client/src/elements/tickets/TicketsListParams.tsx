import { MutableRefObject } from "react";

interface TicketsListParams {
    type: number;
    difficulty: number;
    question: string;
    description: string;
    cost: number;
    variants?: string[];
    answer: MutableRefObject<boolean[] | string>;
}

export default TicketsListParams;