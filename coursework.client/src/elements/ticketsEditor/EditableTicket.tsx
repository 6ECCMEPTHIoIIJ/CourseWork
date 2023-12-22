import { Dispatch, ReactNode, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Row from "react-bootstrap/esm/Row";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";


function EditableTicket(params: { idx: number }): ReactNode {
    function InputField(params: { idx: number, paramName: string, name: string }): ReactNode {
        const inputFieldRef = useRef<HTMLTextAreaElement>(null);

        const questions = useRef<string[]>(((): string[] => {
            const saved = localStorage.getItem(params.paramName);
            const initial = JSON.parse(saved || "[\"\"]");
            return initial as string[];
        })());

        const [question, setQuestion] = useState<string>(() => {
            return questions.current[params.idx] || "";
        });

        useLayoutEffect(() => {
            if (inputFieldRef && inputFieldRef.current) {
                inputFieldRef.current.style.height = "inherit";
                inputFieldRef.current.style.height = `${Math.max(
                    inputFieldRef.current.scrollHeight,
                    32
                )}px`;
            }
        }, [question]);

        useEffect(() => {
            questions.current[params.idx] = question;
            localStorage.setItem(params.paramName, JSON.stringify(questions.current));
        }, [params.paramName, params.idx, question]);

        return (
            <InputGroup className="mb-3">
                <InputGroupText>{params.name}</InputGroupText>
                <FormControl
                    as="textarea"
                    style={{ resize: "none" }}
                    className="overflow-hidden"
                    placeholder="Введите текст..."
                    ref={inputFieldRef}
                    value={question}
                    onChange={e => {
                        setQuestion(e.target.value);
                    }}
                />
            </InputGroup>
        );
    }

    const Question = (params: { idx: number }): ReactNode => (
        <InputField
            idx={params.idx}
            paramName="editableQuestions"
            name="Вопрос"
        />
    );

    const Description = (params: { idx: number }): ReactNode => (
        <InputField
            idx={params.idx}
            paramName="editableDescriptions"
            name="Пояснение"
        />
    );

    function Cost(params: { idx: number }): ReactNode {
        const costs = useRef<number[]>(((): number[] => {
            const saved = localStorage.getItem("editableCosts");
            const initial = JSON.parse(saved || "[1]");
            return initial as number[];
        })());

        const [cost, setCost] = useState<number>(() => {
            return costs.current[params.idx] || 1;
        });

        useEffect(() => {
            costs.current[params.idx] = cost;
            localStorage.setItem("editableCosts", JSON.stringify(costs.current));
        }, [params.idx, cost]);

        return (
            <InputGroup>
                <InputGroupText>Стоимость</InputGroupText>
                <FormControl
                    as="input"
                    type="number"
                    pattern="[1-9][0-9]0"
                    placeholder="Укажите число..."
                    value={cost}
                    onChange={e => {
                        const num: number = parseInt(e.target.value);
                        setCost(isNaN(num)
                            ? 1
                            : Math.min(100, Math.max(1, num)));
                    }}
                />
            </InputGroup>
        )
    }

    function Answer(params: { idx: number }) {

        const InputText = (params: { idx: number }): ReactNode => (
            <InputField
                idx={params.idx}
                paramName="editableInputText"
                name="Ответ"
            />
        );

        const variantsLists = useRef<string[][]>(((): string[][] => {
            const saved = localStorage.getItem("editableVariants");
            const initial = JSON.parse(saved || "[[\"\"]]");
            return initial as string[][];
        })());

        const singleChoiseAnswers = useRef<number[]>(((): number[] => {
            const saved = localStorage.getItem("editableSingleChoise");
            const initial = JSON.parse(saved || "[0]");
            return initial as number[];
        })());

        const multipleChoiseAnswers = useRef<number[][]>(((): number[][] => {
            const saved = localStorage.getItem("editableMultipleChoise");
            const initial = JSON.parse(saved || "[[]]");
            return initial as number[][];
        })());

        const [variants, setVariants] = useState<string[]>(() => {
            return variantsLists.current[params.idx] || [""];
        });

        const [singleChoiseAnswer, setSingleChoiseAnswer] = useState<number>(() => {
            return singleChoiseAnswers.current[params.idx] || 0;
        });

        const [multipleChoiseAnswer, setMultipleChoiseAnswer] = useState<Set<number>>(() => {
            return new Set<number>([...multipleChoiseAnswers.current[params.idx]] || []);
        });

        useEffect(() => {
            variantsLists.current[params.idx] = variants;
            localStorage.setItem("editableVariants", JSON.stringify(variantsLists.current));
        }, [params.idx, variants]);

        useEffect(() => {
            multipleChoiseAnswers.current[params.idx] = [...multipleChoiseAnswer].sort();
            localStorage.setItem("editableMultipleChoise", JSON.stringify(multipleChoiseAnswers.current));
        }, [params.idx, multipleChoiseAnswer]);

        useEffect(() => {
            singleChoiseAnswers.current[params.idx] = singleChoiseAnswer;
            localStorage.setItem("editableSingleChoise", JSON.stringify(singleChoiseAnswers.current));
        }, [params.idx, singleChoiseAnswer]);


        return (

            <Tabs
                defaultActiveKey="input-text"
                justify
                className="mb-3"
                variant="pills"
            >
                <Tab eventKey="single-choise" title="Выбор одного варианта ответа">
                    <Form>
                        <ListGroup variant="flush" className="mb-3">
                            {variants.map((variant, i) => (
                                <ListGroupItem key={i.toString()}>
                                    <InputGroup>
                                        <InputGroup.Radio
                                            name="SingleChoise"
                                            checked={singleChoiseAnswer == i}
                                            onChange={() => {
                                                setSingleChoiseAnswer(i);
                                            }} />
                                        <FormControl
                                            value={variant}
                                            onChange={e => {
                                                variants[i] = e.target.value;
                                                setVariants([...variants]);
                                            }}
                                        />
                                        {variants.length > 1
                                            ? <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    variants.splice(i, 1);
                                                    setVariants([...variants]);
                                                    setMultipleChoiseAnswer(new Set([...multipleChoiseAnswer]
                                                        .filter(el => el != i)
                                                        .map(el => Math.min(i < el ? el - 1 : el, variants.length - 1))));
                                                    setSingleChoiseAnswer(Math.min(i < singleChoiseAnswer ? singleChoiseAnswer - 1 : singleChoiseAnswer, variants.length - 1));
                                                }}>-</Button>
                                            : <></>
                                        }
                                    </InputGroup>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <InputGroup>
                            <Button
                                onClick={() => {
                                    setVariants([...variants, ""]);
                                }}>+</Button>
                        </InputGroup>
                    </Form>
                </Tab>
                <Tab eventKey="multiple-choise" title="Множественный выбор">
                    <Form>
                        <ListGroup variant="flush" className="mb-3">
                            {variants.map((variant, i) => (
                                <ListGroupItem key={i.toString()}>
                                    <InputGroup>
                                        <InputGroup.Checkbox
                                            name="MultipleChoise"
                                            checked={multipleChoiseAnswer.has(i)}
                                            onChange={e => {
                                                if (e.target.checked)
                                                    multipleChoiseAnswer.add(i);
                                                else
                                                    multipleChoiseAnswer.delete(i);

                                                setMultipleChoiseAnswer(new Set(multipleChoiseAnswer));
                                            }} />
                                        <FormControl
                                            value={variant}
                                            onChange={e => {
                                                variants[i] = e.target.value;
                                                setVariants([...variants]);
                                            }}
                                        />
                                        {variants.length > 1
                                            ? <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    variants.splice(i, 1);
                                                    setVariants([...variants]);
                                                    setMultipleChoiseAnswer(new Set([...multipleChoiseAnswer]
                                                        .filter(el => el != i)
                                                        .map(el => Math.min(i < el ? el - 1 : el, variants.length - 1))));
                                                    setSingleChoiseAnswer(Math.min(i < singleChoiseAnswer ? singleChoiseAnswer - 1 : singleChoiseAnswer, variants.length - 1));
                                                }}>-</Button>
                                            : <></>
                                        }
                                    </InputGroup>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <InputGroup>
                            <Button
                                onClick={() => {
                                    setVariants([...variants, ""]);
                                }}>+</Button>
                        </InputGroup>
                    </Form>
                </Tab>
                <Tab eventKey="input-text" title="Развернутый ответ">
                    <InputText idx={params.idx} />
                </Tab>
            </Tabs>
        )
    }

    return (
        <Card>
            <CardHeader className="bg-secondary text-white">Билет №{params.idx + 1}</CardHeader>
            <CardBody className="p-2">
                <Row className="w-100">
                    <Col className="col-7">
                        <Question idx={params.idx} />
                        <Description idx={params.idx} />
                        <Cost idx={params.idx} />
                    </Col>
                    <Col className="col-5">
                        <Answer idx={params.idx} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default EditableTicket;

//function EditableTicket(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
//    function Question(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
//        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
//        const [ticketQuestion, setTicketQuestion] = useState<string>();

//        useEffect(() => {
//            if (inputFieldRef && inputFieldRef.current) {
//                inputFieldRef.current.style.height = "0px";
//                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
//            }
//        }, [ticketQuestion]);

//        useEffect(() => {
//            params.ticket.current.question = ticketQuestion;
//        }, [ticketQuestion, params.ticket]);

//        return (
//            <InputGroup className="mb-3">
//                <InputGroupText>Вопрос</InputGroupText>
//                <FormControl
//                    id={"question" + params.i.toString()}
//                    as="textarea"
//                    style={{ resize: "none" }}
//                    className="overflow-hidden"
//                    placeholder="Введите текст..."
//                    ref={inputFieldRef}
//                    value={ticketQuestion}
//                    onChange={e => {
//                        setTicketQuestion(e.target.value);
//                    }}
//                />
//            </InputGroup>
//        );
//    }

//    function Description(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
//        const inputFieldRef = useRef<HTMLTextAreaElement>(null);
//        const [ticketDescription, setTicketDescription] = useState<string>();

//        useEffect(() => {
//            if (inputFieldRef && inputFieldRef.current) {
//                inputFieldRef.current.style.height = "0px";
//                inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
//            }
//        }, [ticketDescription]);

//        useEffect(() => {
//            params.ticket.current.description = ticketDescription;
//        }, [ticketDescription, params.ticket]);

//        return (
//            <InputGroup className="mb-3">
//                <InputGroupText>Пояснение</InputGroupText>
//                <FormControl
//                    id={"description" + params.i.toString()}
//                    as="textarea"
//                    style={{ resize: "none" }}
//                    className="overflow-hidden"
//                    placeholder="Введите текст..."
//                    ref={inputFieldRef}
//                    value={ticketDescription}
//                    onChange={e => {
//                        setTicketDescription(e.target.value);
//                    }}
//                />
//            </InputGroup>
//        )
//    }

//    function Cost(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
//        const [ticketCost, setTicketCost] = useState<number>();

//        useEffect(() => {
//            params.ticket.current.cost = ticketCost;
//        }, [ticketCost, params.ticket]);

//        return (
//            <InputGroup>
//                <InputGroupText>Стоимость</InputGroupText>
//                <FormControl
//                    id={"cost" + params.i.toString()}
//                    as="input"
//                    type="number"
//                    pattern="[1-9][0-9]"
//                    placeholder="Укажите число..."
//                    value={ticketCost}
//                    onChange={e => {
//                        const num: number = parseInt(e.target.value);
//                        setTicketCost(isNaN(num)
//                            ? undefined
//                            : Math.min(99, Math.max(1, num)));
//                    }}
//                />
//            </InputGroup>
//        )
//    }


//    function Answer(params: { i: number, ticket: MutableRefObject<ITicketBaseTemplate> }) {
//        const InputText = forwardRef(function InputText(params: { ticket: MutableRefObject<ITicketBaseTemplate> }, ref: ForwardedRef<HTMLTextAreaElement>) {
//            const inputFieldRef = ref as MutableRefObject<HTMLTextAreaElement>;
//            const [answerInputText, , ,] = useContext(AnswerContext);
//            const [inputText, setInputText] = useState<string>(answerInputText.current!);

//            useEffect(() => {
//                if (inputFieldRef && inputFieldRef.current) {
//                    inputFieldRef.current.style.height = "0px";
//                    inputFieldRef.current.style.height = inputFieldRef.current.scrollHeight + "px";
//                }
//            }, [inputFieldRef, inputText]);

//            useEffect(() => {
//                params.ticket.current.answer = inputText;
//                answerInputText.current = inputText;
//            }, [answerInputText, inputText, params.ticket]);

//            return (
//                <InputGroup>
//                    <InputGroupText>Ответ</InputGroupText>
//                    <FormControl
//                        as="textarea"
//                        style={{ resize: "none" }}
//                        className="overflow-hidden"
//                        placeholder="Введите текст..."
//                        ref={ref}
//                        value={inputText}
//                        onChange={e => {
//                            setInputText(e.target.value);
//                        }}
//                    />
//                </InputGroup>
//            )
//        });

//        function SingleChoise(params: { ticket: MutableRefObject<ITicketBaseTemplate> }) {
//            const [, answerSingleChoise, , answerVariants] = useContext(AnswerContext);
//            const [variants, setVariants] = useState<string[]>(answerVariants.current!);
//            const [singleChoise, setSingleChoise] = useState<number>(answerSingleChoise.current!);

//            useEffect(() => {
//                params.ticket.current.variants = variants;
//                answerVariants.current = variants;
//            }, [answerVariants, params.ticket, variants]);

//            useEffect(() => {
//                //params.ticket.current.answer = singleChoise;
//                answerSingleChoise.current = singleChoise;
//            }, [answerSingleChoise, params.ticket, singleChoise]);

//            return (
//                <ul className="w-100">
//                    {answerVariants.current?.map((variant, i) => (
//                        <li idx={i.toString()}>
//                            <InputGroup>
//                                <InputGroup.Radio
//                                    name="single-choise"
//                                    checked={singleChoise == i}
//                                    onChange={() => {
//                                        setSingleChoise(i);
//                                    }} />
//                                <FormControl
//                                    value={variant}
//                                    onChange={e => {
//                                        variants[i] = e.target.value;
//                                        setVariants([...variants]);

//                                    }}
//                                />
//                            </InputGroup>
//                        </li>
//                    ))}

//                </ul>
//            )
//        }

//        const [ticketType, setTicketType] = useState<number>(2);
//        const answerInputText = useRef<string>();
//        const answerSingleChoise = useRef<number>();
//        const answerMultipleChoise = useRef<number[]>();
//        const answerVariants = useRef<string[]>(["`12`1", "Sasa"]);
//        const AnswerContext = createContext<[MutableRefObject<string | undefined>,
//            MutableRefObject<number | undefined>,
//            MutableRefObject<number[] | undefined>,
//            MutableRefObject<string[] | undefined>]>([answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]);


//        useEffect(() => {
//            params.ticket.current.type = ticketType;
//        }, [params.ticket, ticketType]);

//        useEffect(() => {
//            switch (ticketType) {
//                case 0:
//                    params.ticket.current.answer = answerSingleChoise.current;
//                    break;
//                case 1:
//                    params.ticket.current.answer = answerMultipleChoise.current;
//                    break;
//                case 2:
//                    params.ticket.current.answer = answerInputText.current;
//                    break;
//            }
//        }, [params.ticket, ticketType]);

//        return (

//            <Tabs
//                defaultActiveKey="input-text"
//                justify
//                className="mb-3"
//                variant="pills"
//                onSelect={idx => {
//                    console.log(idx);

//                    if (idx == 'single-choise')
//                        setTicketType(0);
//                    else if (idx == 'multiple-choise')
//                        setTicketType(1);
//                    else if (idx == 'input-text')
//                        setTicketType(2);
//                }}
//            >
//                <Tab eventKey="single-choise" title="Выбор одного варианта ответа">
//                    <AnswerContext.Provider value={[answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]}>
//                        <SingleChoise ticket={params.ticket} />
//                    </AnswerContext.Provider>

//                </Tab>
//                <Tab eventKey="multiple-choise" title="Множественный выбор">

//                </Tab>
//                <Tab eventKey="input-text" title="Развернутый ответ">
//                    <AnswerContext.Provider value={[answerInputText, answerSingleChoise, answerMultipleChoise, answerVariants]}>
//                        <InputText ticket={params.ticket} ref={ } />
//                    </AnswerContext.Provider>
//                </Tab>
//            </Tabs>
//        )
//    }



//    return <div>
//        <Row>
//            <Col>
//                <Form>
//                    <Question i={params.i} ticket={params.ticket} />
//                    <Description i={params.i} ticket={params.ticket} />
//                    <Cost i={params.i} ticket={params.ticket} />
//                </Form>
//            </Col>
//            <Col>
//                <Answer i={params.i} ticket={params.ticket} />
//            </Col>
//        </Row>
//    </div>
//}

//export default EditableTicket;