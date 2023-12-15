import { ForwardedRef, MutableRefObject, forwardRef } from "react";

import "./TicketAnswer.css"

interface TicketMultipleChoiseParams {
    idx: number;
    variants: string[];
}

interface TicketMultipleChoiseElParams {
    idx: number;
    i: number;
    variant: string;
}

const TicketMultipleChoiseEl = forwardRef(function TicketMultipleChoiseEl(params: TicketMultipleChoiseElParams, ref: ForwardedRef<boolean[]>) {
    return <div className="form-check">
        <label className="form-check-label list-group-item">
            <input
                className={"form-check-input"}
                type="checkbox"
                id={params.i.toString()}
                name={params.idx.toString()}
                onChange={() => {
                    const list = ref as MutableRefObject<boolean[]>;
                    list.current[params.i] = !list.current[params.i];
                }}
            />
            {params.variant}
        </label>
    </div>
})

const TicketMultipleChoise = forwardRef(function TicketMultipleChoise(params: TicketMultipleChoiseParams, ref: ForwardedRef<boolean[]>) {
    return <div className="card ticket-answer w-50 rounded-0 border-start-0">
        <div className="card-header d-flex rounded-0">
            <span>Выберите все варианты ответа</span>
        </div>
        <div className="card-body d-flex">
            <div className="text-start list-group w-100">{params.variants.map((variant, i) =>
                <TicketMultipleChoiseEl
                    idx={params.idx}
                    i={i}
                    variant={variant}
                    ref={ref}
                    key={i}
                />)}</div>
        </div>
    </div>
})


export default TicketMultipleChoise;

