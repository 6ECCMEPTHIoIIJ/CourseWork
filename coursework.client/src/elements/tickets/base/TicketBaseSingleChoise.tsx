import { ForwardedRef, MutableRefObject, createContext, forwardRef, useContext, useEffect, useState } from "react";

import "./TicketBase.css"

interface TicketBaseSingleChoiseParams {
    idx: number;
    variants: string[];
}

interface TicketBaseSingleChoiseElParams {
    idx: number;
    i: number;
    variant: string;
}

interface SingleCoiseContextValue {
    checkedList: boolean[];
    setCheckedList: (n: boolean[]) => void;
}

const SingleChoiseContext = createContext(null as unknown as SingleCoiseContextValue)

function TicketBaseSingleChoiseEl(params: TicketBaseSingleChoiseElParams) {
    const { checkedList, setCheckedList } = useContext(SingleChoiseContext);
    const id: string = params.i.toString() + params.idx.toString();

    return <div className="form-check">
        <input
            type="radio"
            className="btn-check"
            id={id}
            name={params.idx.toString()}
            checked={checkedList[params.i]}
            onChange={() => {
                for (let i = 0; i < checkedList.length; ++i)
                    checkedList[i] = i == params.i;
                setCheckedList([...checkedList]);
            }}
        />
        <label
            className="text-start w-100 rounded-0 btn border btn-light"
            htmlFor={id}
        >
            {params.variant}
        </label>
    </div>
}

const TicketBaseSingleChoise = forwardRef(function TicketBaseSingleChoise(params: TicketBaseSingleChoiseParams, ref: ForwardedRef<boolean[]>) {
    const [checkedList, setCheckedList] = useState<boolean[]>(params.variants.map(() => false));

    useEffect(() => {
        const list = ref as MutableRefObject<boolean[]>;
        list.current = [...checkedList];
    }, [checkedList, ref]);

    return <div className="w-50 p-3 border-end d-flex flex-column">
        <span className="ms-5 align-self-start">Выберите один верный вариант ответа</span>
        <form className="mt-4">
            <SingleChoiseContext.Provider value={{ checkedList: checkedList, setCheckedList: setCheckedList }}>
                <div className="w-100">{params.variants.map((variant, i) =>
                    <TicketBaseSingleChoiseEl
                        idx={params.idx}
                        i={i}
                        variant={variant}
                        key={i}
                    />)}
                </div>
            </SingleChoiseContext.Provider>
        </form>

    </div>
})


export default TicketBaseSingleChoise;

