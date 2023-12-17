import { ForwardedRef, MutableRefObject, forwardRef, useEffect, useRef, useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

interface ITicketBaseTemplate {
    type?: number,
    question?: string;
    description?: string;
    variants?: string[];
    cost?: number;
    answer?: number | number[] | string;
}

const EditableTicket = forwardRef(function EditableTicket(params: { i: number }, ref: ForwardedRef<ITicketBaseTemplate>) {
    const Question = forwardRef(function Question(params: { i: number }, ref: ForwardedRef<ITicketBaseTemplate>) {
        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
        const ticketRef = ref as MutableRefObject<ITicketBaseTemplate>;
        const [ticketQuestion, setTicketQuestion] = useState<string>();

        useEffect(() => {
            if (inputFieldRef && inputFieldRef.current) {
                inputFieldRef.current.style.height = "0px";
                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
            }
        }, [ticketQuestion]);

        useEffect(() => {
            ticketRef.current.question = ticketQuestion;
        }, [ticketQuestion, ticketRef]);

        return (
            <InputGroup className="mb-3">
                <InputGroupText>Вопрос</InputGroupText>
                <FormControl
                    id={"question" + params.i.toString()}
                    as="textarea"
                    style={{ resize: "none" }}
                    className="overflow-hidden"
                    placeholder="Введите текст..."
                    ref={inputFieldRef}
                    value={ticketQuestion}
                    onChange={e => {
                        setTicketQuestion(e.target.value);
                    }}
                />
            </InputGroup>
        );
    });

    const Description = forwardRef(function Description(params: { i: number }, ref: ForwardedRef<ITicketBaseTemplate>) {
        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
        const ticketRef = ref as MutableRefObject<ITicketBaseTemplate>;
        const [ticketDescription, setTicketDescription] = useState<string>();

        useEffect(() => {
            if (inputFieldRef && inputFieldRef.current) {
                inputFieldRef.current.style.height = "0px";
                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
            }
        }, [ticketDescription]);

        useEffect(() => {
            ticketRef.current.description = ticketDescription;
        }, [ticketDescription, ticketRef]);

        return <div className="input-group mb-3">
            <span className="input-group-text">Пояснение</span>
            <textarea
                id={"description" + params.i.toString()}
                className="form-control overflow-hidden"
                placeholder="Введите текст..."
                value={ticketDescription}
                ref={inputFieldRef}
                style={{ resize: "none" }}
                onChange={e => {
                    setTicketDescription(e.target.value);
                }}
            />
        </div>
    });

    const Cost = forwardRef(function Cost(params: { i: number }, ref: ForwardedRef<ITicketBaseTemplate>) {
        const ticketRef = ref as MutableRefObject<ITicketBaseTemplate>;
        const [ticketCost, setTicketCost] = useState<number>();

        useEffect(() => {
            ticketRef.current.cost = ticketCost;
        }, [ticketCost, ticketRef]);

        return <div className="input-group">
            <span className="input-group-text">Стоимость</span>
            <input
                id={"cost" + params.i.toString()}
                type="number"
                pattern="[1-9][0-9]"
                className="form-control"
                placeholder="Укажите число..."
                value={ticketCost}
                onChange={e => {
                    const num: number = parseInt(e.target.value);
                    setTicketCost(isNaN(num)
                        ? undefined
                        : Math.min(99, Math.max(1, num)));
                }}
            />
        </div>
    })


    const Answer = forwardRef(function Answer(params: { i: number }, ref: ForwardedRef<ITicketBaseTemplate>) {
        const ticketRef = ref as MutableRefObject<ITicketBaseTemplate>;
        const [ticketType, setTicketType] = useState<number>(2);

        useEffect(() => {
            ticketRef.current.type = ticketType;
        }, [ticketType, ticketRef]);

        return <div>
            <nav>
                <div className="nav nav-tabs" role="tablist">
                    <button
                        id="nav-single-choise-tab"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#single-choise"
                        type="button"
                        role="tab"
                        aria-controls="single-choise"
                        aria-selected="false"
                        onChange={() => {
                            setTicketType(0);
                        }}
                    >
                        Выбор одного варианта ответа
                    </button>
                    <button
                        id="nav-input-text-tab"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#input-text"
                        type="button"
                        role="tab"
                        aria-controls="input-text"
                        aria-selected="true"
                        onChange={() => {
                            setTicketType(2);
                        }}
                    >
                        Ввод развернутого ответа
                    </button>
                </div>
            </nav>
            <div className="tab-content">
                <div
                    className="tab-pane fade show active"
                    id="input-text"
                    role="tabpanel"
                    aria-labelledby="nav-single-choise-tab"
                >
                    <div className="input-group mb-3">
                        <span className="input-group-text">Ответ</span>
                        <textarea
                            id={"answer-input-text" + params.i.toString()}
                            className="form-control overflow-hidden"
                            placeholder="Введите текст..."
                            disabled
                            rows={1}
                            style={{ resize: "none" }}
                        />
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="single-choise"
                    role="tabpanel"
                    aria-labelledby="nav-input-text-tab"
                >
                    <div className="input-group mb-3">
                        <span className="input-group-text">Хуй</span>
                        <textarea
                            id={"answer-single-choise" + params.i.toString()}
                            className="form-control overflow-hidden"
                            placeholder="Введите текст..."
                            disabled
                            rows={1}
                            style={{ resize: "none" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    })

    const [ticketVariants, setTicketVariants] = useState<string[] | undefined>();

    return <div>
        <div className="row">
            <div className="col-8">
                <form>
                    <Question i={params.i} ref={ref} />
                    <Description i={params.i} ref={ref} />
                    <Cost i={params.i} ref={ref} />
                </form>
            </div>
            <div className="col-4">
                <Answer i={params.i} ref={ref} />
            </div>
        </div>
    </div>
});

export default EditableTicket;