import { ForwardedRef, forwardRef } from "react";

import "./TicketAnswer.css"

interface TicketSequenceSetupParams {
    idx: number;
    variants: string[];
}

interface TicketSequenceSetupElParams {
    idx: number;
    i: number;
    variant: string;
}

const TicketSequenceSetupEl = forwardRef(function TicketSequenceSetupEl(params: TicketSequenceSetupElParams, ref: ForwardedRef<boolean[]>) {
    return <div className="form-check">
        <div className="form-check-label list-group-item">
            {params.variant}
        </div>
    </div>
})

const TicketSequenceSetup = forwardRef(function TicketSequenceSetup(params: TicketSequenceSetupParams, ref: ForwardedRef<boolean[]>) {
    return <div className="card ticket-answer w-50 rounded-0 border-start-0">
        <div className="card-header d-flex rounded-0">
            <span>Выберите все варианты ответа</span>
        </div>
        <div className="card-body d-flex">
            <div className="text-start list-group w-100">{params.variants.map((variant, i) =>
                <TicketSequenceSetupEl
                    idx={params.idx}
                    i={i}
                    variant={variant}
                    ref={ref}
                    key={i}
                />)}</div>
        </div>
    </div>
})


export default TicketSequenceSetup;