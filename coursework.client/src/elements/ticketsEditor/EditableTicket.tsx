import { Dispatch, ForwardedRef, MutableRefObject, ReactNode, createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Row from "react-bootstrap/esm/Row";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";

interface ITicketBaseTemplate {
    type?: number,
    question?: string;
    description?: string;
    variants?: string[];
    cost?: number;
    answer?: number | number[] | string;
}

function EditableTicket(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
    function Question(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
        const [ticketQuestion, setTicketQuestion] = useState<string>();

        useEffect(() => {
            if (inputFieldRef && inputFieldRef.current) {
                inputFieldRef.current.style.height = "0px";
                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
            }
        }, [ticketQuestion]);

        useEffect(() => {
            params.ticket.current.question = ticketQuestion;
        }, [ticketQuestion, params.ticket]);

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
    }

    function Description(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
        const [ticketDescription, setTicketDescription] = useState<string>();

        useEffect(() => {
            if (inputFieldRef && inputFieldRef.current) {
                inputFieldRef.current.style.height = "0px";
                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
            }
        }, [ticketDescription]);

        useEffect(() => {
            params.ticket.current.description = ticketDescription;
        }, [ticketDescription, params.ticket]);

        return (
            <InputGroup className="mb-3">
                <InputGroupText>Пояснение</InputGroupText>
                <FormControl
                    id={"description" + params.i.toString()}
                    as="textarea"
                    style={{ resize: "none" }}
                    className="overflow-hidden"
                    placeholder="Введите текст..."
                    ref={inputFieldRef}
                    value={ticketDescription}
                    onChange={e => {
                        setTicketDescription(e.target.value);
                    }}
                />
            </InputGroup>
        )
    }

    function Cost(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
        const [ticketCost, setTicketCost] = useState<number>();

        useEffect(() => {
            params.ticket.current.cost = ticketCost;
        }, [ticketCost, params.ticket]);

        return (
            <InputGroup>
                <InputGroupText>Стоимость</InputGroupText>
                <FormControl
                    id={"cost" + params.i.toString()}
                    as="input"
                    type="number"
                    pattern="[1-9][0-9]"
                    placeholder="Укажите число..."
                    value={ticketCost}
                    onChange={e => {
                        const num: number = parseInt(e.target.value);
                        setTicketCost(isNaN(num)
                            ? undefined
                            : Math.min(99, Math.max(1, num)));
                    }}
                />
            </InputGroup>
        )
    }


    function Answer(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
        const InputText = forwardRef(function InputText(params: { ticket: MutableRefObject<ITicketBaseTemplate> }, ref: ForwardedRef<HTMLTextAreaElement>) {
            const inputFieldRef = ref as MutableRefObject<HTMLTextAreaElement>;
            const [answerInputText, , ,] = useContext(AnswerContext);
            const [inputText, setInputText] = useState<string>(answerInputText.current!);

            useEffect(() => {
                if (inputFieldRef && inputFieldRef.current) {
                    inputFieldRef.current.style.height = "0px";
                    inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
                }
            }, [inputFieldRef, inputText]);

            useEffect(() => {
                params.ticket.current.answer = inputText;
                answerInputText.current = inputText;
            }, [answerInputText, inputText, params.ticket]);

            return (
                <InputGroup>
                    <InputGroupText>Ответ</InputGroupText>
                    <FormControl
                        as="textarea"
                        style={{ resize: "none" }}
                        className="overflow-hidden"
                        placeholder="Введите текст..."
                        ref={ref}
                        value={inputText}
                        onChange={e => {
                            setInputText(e.target.value);
                        }}
                    />
                </InputGroup>
            )
        });

        function SingleChoise(params: { ticket: MutableRefObject<ITicketBaseTemplate> }) {
            const [, answerSingleChoise, , answerVariants] = useContext(AnswerContext);
            const [variants, setVariants] = useState<string[]>(answerVariants.current!);
            const [singleChoise, setSingleChoise] = useState<number>(answerSingleChoise.current!);

            useEffect(() => {
                params.ticket.current.variants = variants;
                answerVariants.current = variants;
            }, [answerVariants, params.ticket, variants]);

            useEffect(() => {
                //params.ticket.current.answer = singleChoise;
                answerSingleChoise.current = singleChoise;
            }, [answerSingleChoise, params.ticket, singleChoise]);

            return (
                <ul className="w-100">
                    {answerVariants.current?.map((variant, i) => (
                        <li key={i.toString()}>
                            <InputGroup>
                                <InputGroup.Radio
                                    name="single-choise"
                                    checked={singleChoise == i}
                                    onChange={() => {
                                        setSingleChoise(i);
                                    }} />
                                <FormControl
                                    value={variant}
                                    onChange={e => {
                                        variants[i] = e.target.value;
                                        setVariants([...variants]);

                                    }}
                                />
                            </InputGroup>
                        </li>
                    ))}

                </ul>
            )
        }

        const [ticketType, setTicketType] = useState<number>(2);
        const answerInputText = useRef<string>();
        const answerSingleChoise = useRef<number>();
        const answerMultipleChoise = useRef<number[]>();
        const answerVariants = useRef<string[]>(["`12`1", "Sasa"]);
        const AnswerContext = createContext<[MutableRefObject<string | undefined>,
            MutableRefObject<number | undefined>,
            MutableRefObject<number[] | undefined>,
            MutableRefObject<string[] | undefined>]>([answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]);


        useEffect(() => {
            params.ticket.current.type = ticketType;
        }, [params.ticket, ticketType]);

        useEffect(() => {
            switch (ticketType) {
                case 0:
                    params.ticket.current.answer = answerSingleChoise.current;
                    break;
                case 1:
                    params.ticket.current.answer = answerMultipleChoise.current;
                    break;
                case 2:
                    params.ticket.current.answer = answerInputText.current;
                    break;
            }
        }, [params.ticket, ticketType]);

        return (

            <Tabs
                defaultActiveKey="input-text"
                justify
                className="mb-3"
                variant="pills"
                onSelect={key => {
                    console.log(key);

                    if (key == 'single-choise')
                        setTicketType(0);
                    else if (key == 'multiple-choise')
                        setTicketType(1);
                    else if (key == 'input-text')
                        setTicketType(2);
                }}
            >
                <Tab eventKey="single-choise" title="Выбор одного варианта ответа">
                    <AnswerContext.Provider value={[answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]}>
                        <SingleChoise ticket={params.ticket} />
                    </AnswerContext.Provider>

                </Tab>
                <Tab eventKey="multiple-choise" title="Множественный выбор">

                </Tab>
                <Tab eventKey="input-text" title="Развернутый ответ">
                    <AnswerContext.Provider value={[answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]}>
                        <InputText ticket={params.ticket} ref={ } />
                    </AnswerContext.Provider>
                </Tab>
            </Tabs>
        )
    }



    return <div>
        <Row>
            <Col>
                <Form>
                    <Question i={params.i} ticket={params.ticket} />
                    <Description i={params.i} ticket={params.ticket} />
                    <Cost i={params.i} ticket={params.ticket} />
                </Form>
            </Col>
            <Col>
                <Answer i={params.i} ticket={params.ticket} />
            </Col>
        </Row>
    </div>
}

export default EditableTicket;