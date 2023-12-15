import "./TicketBase.css"

export interface Difficulties {
    easy: string;
    normal: string;
    hard: string;
    special: string;
}

function TicketBase(idx: number,  question: string, difficultyView: string, difficultyName: string, cost: number) {
    return <div className="card ticket-base w-50 rounded-0">
        <div className="card-header d-flex justify-content-between">
            <span className="text-undirlined">№{idx}</span>
            <div className={difficultyView}>
                {difficultyName}
            </div>
        </div>
        <div className="card-body d-flex">
            <span className="text-start">{question}</span>
        </div>
        <div className="card-footer d-flex">
            <span>Стоимость: {cost} б.</span>
        </div>
    </div>
}


export default TicketBase;