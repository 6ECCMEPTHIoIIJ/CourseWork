import { ReactNode } from "react";

import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import { TicketDescription } from "./core/TicketDescription";
import { TicketQuestion } from "./core/TicketQuestion";
import { TicketCost } from "./core/TicketCost";
import { TicketAnswer } from "./core/TicketAnswer";

function EditableTicket(params: { idx: number }): ReactNode {
    return (
        <Card>
            <CardHeader className="bg-secondary text-white">Билет №{params.idx + 1}</CardHeader>
            <CardBody className="p-2">
                <Row className="w-100">
                    <Col className="col-7">
                        <TicketQuestion idx={params.idx} />
                        <TicketDescription idx={params.idx} />
                        <TicketCost idx={params.idx} />
                    </Col>
                    <Col className="col-5">
                        <TicketAnswer idx={params.idx} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default EditableTicket;