import { ReactNode, createRef, useContext } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Form from "react-bootstrap/esm/Form";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";
import { TicketInputChoiseField } from "./TicketInputChoiseField";
import { TicketRemoveChoiseButton } from "./TicketRemoveChoiseButton";
import { TicketAddChoiseButton } from "./TicketAddChoiseButton";
import "./EditableTicket.css"
import Radio from "@mui/material/Radio";

export function TicketSingleChoise(): ReactNode {
    const [variants, , singleChoiseAnswer, setSingleChoiseAnswer] = useContext<TicketAnswerContextParams>(TicketAnswerContext);

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
                            choseEl={<Radio
                                name="TicketSingleChoise"
                                checked={singleChoiseAnswer == i}
                                onChange={() => {
                                    setSingleChoiseAnswer(i);
                                }} />}
                            deleteBtn={<TicketRemoveChoiseButton i={i} />}
                        />
                    </ListGroupItem>
                ))}
            </ListGroup>
            <TicketAddChoiseButton listRef={listRef as MutableRefObject<HTMLInputElement>} />
        </Form >
    );
}
