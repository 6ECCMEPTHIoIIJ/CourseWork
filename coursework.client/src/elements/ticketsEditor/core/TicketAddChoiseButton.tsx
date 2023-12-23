import { MutableRefObject, ReactNode, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";

export function TicketAddChoiseButton(params: { listRef: MutableRefObject<HTMLInputElement> }): ReactNode {
    const [variants, setVariants] = useContext<TicketAnswerContextParams>(TicketAnswerContext);
    return (
        <Button
            className="w-50"
            onClick={() => {
                params.listRef.current.scrollIntoView({ behavior: 'smooth' });
                setVariants([...variants, ""]);
            }}>+</Button>
    );
}
