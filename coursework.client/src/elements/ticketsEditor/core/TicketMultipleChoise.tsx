import { MutableRefObject, ReactNode, createRef, useContext } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";
import { TicketInputChoiseField } from "./TicketInputChoiseField";
import { TicketRemoveChoiseButton } from "./TicketRemoveChoiseButton";
import { TicketAddChoiseButton } from "./TicketAddChoiseButton";
import "./EditableTicket.css"
import Checkbox from "@mui/material/Checkbox";

export function TicketMultipleChoise(): ReactNode {
    const [variants, , , , multipleChoiseAnswer, setMultipleChoiseAnswer] = useContext<TicketAnswerContextParams>(TicketAnswerContext);

    const listRef = createRef<HTMLInputElement>();

    return (
        <Form>
            <ListGroup
                variant="flush"
                className="mb-3 ticket-choise-list"
            >
                {variants.map((_, i) => (
                    <ListGroupItem key={i.toString()}>
                            <TicketInputChoiseField
                                ref={listRef}
                            i={i}
                            choseEl={<Checkbox
                                    name="TicketMultipleChoise"
                                    checked={multipleChoiseAnswer.has(i)}
                                    onChange={e => {
                                        if (e.target.checked)
                                            multipleChoiseAnswer.add(i);

                                        else
                                            multipleChoiseAnswer.delete(i);

                                        setMultipleChoiseAnswer(new Set(multipleChoiseAnswer));
                                    }} />}
                                deleteBtn={<TicketRemoveChoiseButton i={i} />} />
                    </ListGroupItem>
                ))}
            </ListGroup>
            <TicketAddChoiseButton listRef={listRef as MutableRefObject<HTMLInputElement>} />
        </Form>
    );
}
