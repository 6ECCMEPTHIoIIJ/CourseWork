import { ForwardedRef, MutableRefObject, createContext, forwardRef, useContext, useEffect, useState } from "react";

import "./TicketBase.css"

interface TicketBaseMultipleChoiseParams {
    idx: number;
    variants: string[];
}

interface TicketBaseMultipleChoiseElParams {
    idx: number;
    i: number;
    variant: string;
}

export interface MultileChoiseContextValue {
    checkedList: boolean[];
    setCheckedList: (n: boolean[]) => void;
}

const MultipleChoiseContext = createContext(null as unknown as MultileChoiseContextValue)

function TicketBaseMultipleChoiseEl(params: TicketBaseMultipleChoiseElParams) {
    const { checkedList, setCheckedList } = useContext(MultipleChoiseContext);
    const id: string = params.i.toString() + params.idx.toString();

    return <div className="form-check">
        <label className="list-group-item text-start">
            <input
                className="form-check-input"
                type="checkbox"
                id={id}
                name={params.idx.toString()}
                checked={checkedList[params.i]}
                onChange={() => {
                    checkedList[params.i] = !checkedList[params.i];
                    setCheckedList([...checkedList]);
                }}
            />
            {params.variant}
        </label>
    </div>
}

const TicketBaseMultipleChoise = forwardRef(function TicketBaseMultipleChoise(params: TicketBaseMultipleChoiseParams, ref: ForwardedRef<boolean[]>) {
    const [checkedList, setCheckedList] = useState<boolean[]>(params.variants.map(() => false));

    useEffect(() => {
        const list = ref as MutableRefObject<boolean[]>;
        list.current = [...checkedList];
    }, [checkedList, ref]);

    return <div className="w-50 p-3 border-end d-flex flex-column">
        <span className="ms-5 align-self-start text-justify">Выберите все верные варианты ответа</span>
        <form className="mt-4">
            <MultipleChoiseContext.Provider value={{ checkedList: checkedList, setCheckedList: setCheckedList }}>
                <div className="w-100 list-group">{params.variants.map((variant, i) =>
                    <TicketBaseMultipleChoiseEl
                        idx={params.idx}
                        i={i}
                        variant={variant}
                        key={i}
                    />)}
                </div>
            </MultipleChoiseContext.Provider>
        </form>
    </div>
})


export default TicketBaseMultipleChoise;

