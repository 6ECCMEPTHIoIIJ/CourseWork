import { MutableRefObject } from "react";
import Ticket from "./Ticket";
import TicketsListParams from "./TicketsListParams";

import "./TicketsList.css";

function TicketsList(params: { tickets: MutableRefObject<TicketsListParams[]> }) {
    return <ul className="w-100 list-unstyled tickets-list m-0">
        {params.tickets.current.map((ticket, i) =>
            <li key={i.toString()} className="mb-5">
                <Ticket
                    type={ticket.type}
                    idx={i}
                    difficulty={ticket.difficulty}
                    question={ticket.question}
                    description={ticket.description}
                    variants={ticket.variants!}
                    ref={ticket.answer}
                    cost={ticket.cost} />
            </li>)}
    </ul>
}

export default TicketsList;