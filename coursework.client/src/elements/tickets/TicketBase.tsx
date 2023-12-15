import "./TicketBase.css"

interface TicketBaseParams {
    idx: number;
    question: string;
    difficultyView: string;
    difficultyName: string;
    cost: number;
}

function TicketBase(params: TicketBaseParams) {
    return <div className="card ticket-base w-50 rounded-0 border-end-0 ">
        <div className="card-header d-flex rounded-0">
            <span>Вопрос №{params.idx}</span>
            <div className={params.difficultyView + " ms-2"}>
                {params.difficultyName}
            </div>
        </div>
        <div className="card-body d-flex">
            <span className="text-start">{params.question}</span>
        </div>
        <div className="card-footer d-flex border-end rounded-0">
            <span>Стоимость: {params.cost} б.</span>

        </div>
    </div>
}


export default TicketBase;