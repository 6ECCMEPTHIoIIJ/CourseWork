import { ReactNode, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";

export function TicketRemoveChoiseButton(params: { i: number; }): ReactNode {
    const [variants, setVariants, singleChoiseAnswer, setSingleChoiseAnswer, multipleChoiseAnswer, setMultipleChoiseAnswer] = useContext<TicketAnswerContextParams>(TicketAnswerContext);

    return (
        variants.length > 1
            ? <Button
                variant="secondary"
                onClick={() => {
                    variants.splice(params.i, 1);
                    setVariants([...variants]);
                    setMultipleChoiseAnswer(new Set([...multipleChoiseAnswer]
                        .filter(el => el != params.i)
                        .map(el => Math.min(params.i < el ? el - 1 : el, variants.length - 1))));
                    setSingleChoiseAnswer(Math.min(params.i < singleChoiseAnswer ? singleChoiseAnswer - 1 : singleChoiseAnswer, variants.length - 1));
                }}>-</Button>
            : <></>
    );
}
