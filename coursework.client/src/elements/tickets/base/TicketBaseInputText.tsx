import { ForwardedRef, MutableRefObject, forwardRef, useEffect, useState } from "react";

import "./TicketBase.css"

interface TicketBaseInputTextParams {
    idx: number;
}

const TicketBaseInputText = forwardRef(function TicketBaseInputText(params: TicketBaseInputTextParams, ref: ForwardedRef<string>) {
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const str = ref as MutableRefObject<string>;
        str.current = input;
    }, [input, ref]);

    return <div className="w-50 p-3 border-end d-flex flex-column">
        <span className="ms-5 align-self-start">Введите развернутый ответ</span>
        <div className="mt-4">
            <textarea
                className="form-control"
                id={params.idx.toString()}
                value={input}
                onChange={e => {
                    setInput(e.target.value);
                }} />
        </div>
    </div>
})


export default TicketBaseInputText;

