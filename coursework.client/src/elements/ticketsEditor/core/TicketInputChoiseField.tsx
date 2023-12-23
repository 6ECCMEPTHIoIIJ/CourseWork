import { ReactNode, useContext } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";

export function TicketInputChoiseField(params: { i: number; }): ReactNode {
    const [variants, setVariants] = useContext<TicketAnswerContextParams>(TicketAnswerContext);
    return (
        <FormControl
            value={variants[params.i]}
            onChange={e => {
                variants[params.i] = e.target.value;
                setVariants([...variants]);
            }} />
    );
}
