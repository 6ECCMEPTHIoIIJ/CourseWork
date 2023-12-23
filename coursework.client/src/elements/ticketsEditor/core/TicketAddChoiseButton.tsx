import { ReactNode, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";

export function TicketAddChoiseButton(): ReactNode {
    const [variants, setVariants] = useContext<TicketAnswerContextParams>(TicketAnswerContext);
    return (
        <Button
            className="w-50"
            onClick={() => {
                setVariants([...variants, ""]);
            }}>+</Button>
    );
}
