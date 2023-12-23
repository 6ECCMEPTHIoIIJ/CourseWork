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

export function TicketSingleChoise(): ReactNode {
    const [variants, , singleChoiseAnswer, setSingleChoiseAnswer] = useContext<TicketAnswerContextParams>(TicketAnswerContext);

    return (
        <Form>
            <ListGroup
                variant="flush"
                className="mb-3 ticket-choise-list"
                style={{
                    height: "50vh"
                }}
            >
                {variants.map((_, i) => (
                    <ListGroupItem key={i.toString()}>
                        <InputGroup>
                            <InputGroup.Radio
                                name="TicketSingleChoise"
                                checked={singleChoiseAnswer == i}
                                onChange={() => {
                                    setSingleChoiseAnswer(i);
                                }} />
                            <TicketInputChoiseField i={i} />
                            <TicketRemoveChoiseButton i={i} />
                        </InputGroup>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <TicketAddChoiseButton />
        </Form >
    );
}
