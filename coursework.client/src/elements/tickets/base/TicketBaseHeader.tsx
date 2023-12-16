import "./TicketBase.css"

interface TicketBaseHeaderParams {
    idx: number;
    difficultyView: string;
    difficultyName: string;
}

function TicketBaseHeader(params: TicketBaseHeaderParams) {
    return <div id={"ticket" + params.idx} className="bg-light w-100 pt-2 pb-2 ps-3 pe-3 border d-flex justify-content-between">
        <span>Вопрос №{params.idx + 1}
            <span className={params.difficultyView + " ms-2 "}>
                {params.difficultyName}
            </span>
        </span>
    </div>
}


export default TicketBaseHeader;