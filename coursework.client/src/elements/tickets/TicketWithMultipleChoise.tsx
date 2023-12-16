import { ForwardedRef, forwardRef } from "react";

import TicketBaseHeader from "./base/TicketBaseHeader";
import TicketBase from "./base/TicketBase";
import TicketBaseFooter from "./base/TicketBaseFooter";
import TicketBaseMultipleChoise from "./base/TicketBaseMultipleChoise";

interface TicketWithMultipleChoiseParams {
    idx: number,
    difficultyView: string,
    difficultyName: string,
    question: string,
    description?: string,
    variants: string[],
    cost: number
}

const TicketWithMultipleChoise = forwardRef(function TicketWithMultipleChoise(params: TicketWithMultipleChoiseParams, ref: ForwardedRef<boolean[]>) {
    return <div className="d-flex flex-column justify-content-center">
        <TicketBaseHeader
            idx={params.idx}
            difficultyView={params.difficultyView}
            difficultyName={params.difficultyName}
        />
        <div className="d-flex">
            <TicketBase
                question={params.question}
                description={params.description}
            />
            <TicketBaseMultipleChoise
                idx={params.idx}
                variants={params.variants}
                ref={ref}
            />
        </div>
        <TicketBaseFooter
            cost={params.cost}
        />
    </div>
})

export default TicketWithMultipleChoise;