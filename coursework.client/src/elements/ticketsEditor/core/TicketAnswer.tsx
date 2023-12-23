import { useEffect, useRef, useState } from "react";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import { TicketAnswerContext } from "./TicketAnswerContext";
import { TicketSingleChoise } from "./TicketSingleChoise";
import { TicketMultipleChoise } from "./TicketMultipleChoise";
import { TicketInputText } from "./TicketInputText";

export function TicketAnswer(params: { idx: number; }) {

    const types = useRef<number[]>(((): number[] => {
        const saved = localStorage.getItem("editableType");
        const initial = JSON.parse(saved || "[0]");
        return initial as number[];
    })());

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

    const [type, setType] = useState<number>(() => {
        return types.current[params.idx] || 0;
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

    useEffect(() => {
        types.current[params.idx] = type;
        localStorage.setItem("editableType", JSON.stringify(types.current));
    }, [params.idx, type]);

    const keys: string[] = ["single-choise", "multiple-choise", "input-text"];

    return (

        <Tabs
            defaultActiveKey={keys[type]}
            justify
            className="mb-3"
            variant="pills"
            onSelect={key => setType(keys.findIndex(v => v == key))}
        >
            <Tab eventKey={keys[0]} title="Выбор одного варианта ответа" >
                <TicketAnswerContext.Provider value={[
                    variants, setVariants,
                    singleChoiseAnswer, setSingleChoiseAnswer,
                    multipleChoiseAnswer, setMultipleChoiseAnswer
                ]}>
                    <TicketSingleChoise />
                </TicketAnswerContext.Provider>
            </Tab>
            <Tab eventKey={keys[1]} title="Множественный выбор">
                <TicketAnswerContext.Provider value={[
                    variants, setVariants,
                    singleChoiseAnswer, setSingleChoiseAnswer,
                    multipleChoiseAnswer, setMultipleChoiseAnswer
                ]}>
                    <TicketMultipleChoise />
                </TicketAnswerContext.Provider>
            </Tab>
            <Tab eventKey={keys[2]} title="Развернутый ответ">
                <TicketInputText idx={params.idx} />
            </Tab>
        </Tabs>
    );
}
