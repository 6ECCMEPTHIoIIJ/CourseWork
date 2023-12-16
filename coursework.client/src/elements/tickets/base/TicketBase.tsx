import "./TicketBase.css"

interface TicketBaseParams {
    question: string;
    description?: string;
}

function TicketBase(params: TicketBaseParams) {
    return <div className="w-50 border-start p-3">
        <p className="text-justify">
            {params.question}
        </p>

        {params.description === undefined
            || params.description === null
            || params.description === ""
            ? <></>
            : <p className="text-justify">
                <em><small>
                    Пояснение: {params.description}
                </small></em>
            </p>}
    </div>
}


export default TicketBase;