import { ReactNode, useContext } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";
import { TicketInputChoiseField } from "./TicketInputChoiseField";
import { TicketRemoveChoiseButton } from "./TicketRemoveChoiseButton";
import { TicketAddChoiseButton } from "./TicketAddChoiseButton";
import "./EditableTicket.css"

export function TicketMultipleChoise(): ReactNode {
    const [variants, , , , multipleChoiseAnswer, setMultipleChoiseAnswer] = useContext<TicketAnswerContextParams>(TicketAnswerContext);

    return (
        <Form>
            <ListGroup
                variant="flush"
                className="mb-3 ticket-choise-list"
                style={{
                    height: "50vh",
                }}            >
                {variants.map((_, i) => (
                    <ListGroupItem key={i.toString()}>
                        <InputGroup>
                            <InputGroup.Checkbox
                                name="TicketMultipleChoise"
                                checked={multipleChoiseAnswer.has(i)}
                                onChange={e => {
                                    if (e.target.checked)
                                        multipleChoiseAnswer.add(i);

                                    else
                                        multipleChoiseAnswer.delete(i);

                                    setMultipleChoiseAnswer(new Set(multipleChoiseAnswer));
                                }} />
                            <TicketInputChoiseField i={i} />
                            <TicketRemoveChoiseButton i={i} />
                        </InputGroup>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <TicketAddChoiseButton />
        </Form>
    );
}
