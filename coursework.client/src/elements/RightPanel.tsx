import { MutableRefObject } from "react";
import TicketsListParams from "./tickets/TicketsListParams";

function RightPanel(params: { tickets: MutableRefObject<TicketsListParams[]> }) {
    return <div className="row" style={{ width: "200px" }}>
        {params.tickets.current.map((_, i) => <div className="col-3">
            <a className="btn btn-light border" style={{ width: "50px"}} href={"#ticket" + i} key={i.toString()}>{i + 1}</a>
        </div>)}
    </div>
}

export default RightPanel;