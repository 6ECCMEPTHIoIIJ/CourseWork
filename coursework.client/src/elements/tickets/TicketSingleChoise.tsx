import { ForwardedRef, MutableRefObject, forwardRef } from "react";

import "./TicketAnswer.css"

interface TicketSingleChoiseParams {
    idx: number;
    variants: string[];
}

interface TicketSingleChoiseElParams {
    idx: number;
    i: number;
    variant: string;
}

const TicketSingleChoiseEl = forwardRef(function TicketSingleChoiseEl(params: TicketSingleChoiseElParams, ref: ForwardedRef<boolean[]>) {
    return <div className="form-check">
        <label className="form-check-label list-group-item">
            <input
                className={"form-check-input"}
                type="radio"
                id={params.i.toString()}
                name={params.idx.toString()}
                onChange={() => {
                    const list = ref as MutableRefObject<boolean[]>;
                    for (let i = 0; i < list.current.length; ++i)
                        list.current[i] = i == params.i;
                }}
            />
            {params.variant}
        </label>
    </div>
})

const TicketSingleChoise = forwardRef(function TicketSingleChoise(params: TicketSingleChoiseParams, ref: ForwardedRef<boolean[]>) {
    return <div className="card ticket-answer w-50 rounded-0 border-start-0">
        <div className="card-header d-flex rounded-0">
            <span>Выберите один верный вариант ответа</span>
        </div>
        <div className="card-body d-flex">
            <div className="text-start list-group w-100">{params.variants.map((variant, i) =>
                <TicketSingleChoiseEl
                    idx={params.idx}
                    i={i}
                    variant={variant}
                    ref={ref}
                    key={i}
                />)}</div>
        </div>
    </div>
})


export default TicketSingleChoise;

