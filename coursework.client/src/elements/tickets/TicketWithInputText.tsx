import { ForwardedRef, forwardRef } from "react";

import TicketBaseHeader from "./base/TicketBaseHeader";
import TicketBase from "./base/TicketBase";
import TicketBaseInputText from "./base/TicketBaseInputText";
import TicketBaseFooter from "./base/TicketBaseFooter";

interface TicketWithInputTextParams {
    idx: number,
    difficultyView: string,
    difficultyName: string,
    question: string,
    description?: string,
    cost: number
}

const TicketWithInputText = forwardRef(function TicketWithInputText(params: TicketWithInputTextParams, ref: ForwardedRef<string>) {
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
            <TicketBaseInputText
                idx={params.idx}
                ref={ref}
            />
        </div>
        <TicketBaseFooter
            cost={params.cost}
        />
    </div>
})

export default TicketWithInputText;