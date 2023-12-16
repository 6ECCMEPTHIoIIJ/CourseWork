import "./TicketBase.css"

interface TicketBaseFooterParams {
    cost: number;
}

function TicketBaseFooter(params: TicketBaseFooterParams) {
    return <div className="bg-light w-100 pt-2 pb-2 ps-3 pe-3 border d-flex justify-content-end">
        <span>Стоимость: {params.cost} б.</span>
    </div>
}


export default TicketBaseFooter;