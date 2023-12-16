import { ForwardedRef, MutableRefObject, forwardRef } from "react";

import TicketWithSingleChoise from "./TicketWithSingleChoise";
import TicketWithMultipleChoise from "./TicketWithMultipleChoise";
import TicketWithInputText from "./TicketWithInputText";
import DifficultyNames from "./DifficultyNames";
import DifficultyViews from "../DifficultyViews";

interface TicketParams {
    type: number;
    idx: number;
    difficulty: number;
    question: string;
    description: string;
    variants?: string[] | undefined;
    cost: number;
}


const Ticket = forwardRef(function Ticket(params: TicketParams, ref: ForwardedRef<boolean[] | string>) {
    switch (params.type) {
        case 0:
            return <TicketWithSingleChoise
                idx={params.idx + 1}
                difficultyView={DifficultyViews[params.difficulty]}
                difficultyName={DifficultyNames[params.difficulty]}
                question={params.question}
                description={params.description}
                variants={params.variants!}
                cost={params.cost}
                ref={ref as MutableRefObject<boolean[]>}
            />;
        case 1:
            return <TicketWithMultipleChoise
                idx={params.idx + 1}
                difficultyView={DifficultyViews[params.difficulty]}
                difficultyName={DifficultyNames[params.difficulty]}
                question={params.question}
                description={params.description}
                variants={params.variants!}
                cost={params.cost}
                ref={ref as MutableRefObject<boolean[]>}
            />;
        case 2:
            return <TicketWithInputText
                idx={params.idx + 1}
                difficultyView={DifficultyViews[params.difficulty]}
                difficultyName={DifficultyNames[params.difficulty]}
                question={params.question}
                description={params.description}
                cost={params.cost}
                ref={ref as MutableRefObject<string>}
            />;
        default:
            return null;
    }

});

export default Ticket;