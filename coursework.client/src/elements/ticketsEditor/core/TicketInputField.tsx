import { ReactNode, useEffect, useRef, useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./EditableTicket.css"

export function TicketInputField(params: { idx: number; paramName: string; name: string; height?: string }): ReactNode {
    const inputFieldRef = useRef<HTMLTextAreaElement>(null);

    const questions = useRef<string[]>(((): string[] => {
        const saved = localStorage.getItem(params.paramName);
        const initial = JSON.parse(saved || "[\"\"]");
        return initial as string[];
    })());

    const [question, setQuestion] = useState<string>(() => {
        return questions.current[params.idx] || "";
    });

    useEffect(() => {
        questions.current[params.idx] = question;
        localStorage.setItem(params.paramName, JSON.stringify(questions.current));
    }, [params.paramName, params.idx, question]);

    return (
        <InputGroup className="mb-3">
            <InputGroupText>{params.name}</InputGroupText>
            <FormControl
                as="textarea"
                className="ticket-input-field"
                style={{ height: params.height }}
                placeholder="Введите текст..."
                ref={inputFieldRef}
                value={question}
                onChange={e => {
                    setQuestion(e.target.value);
                }} />
        </InputGroup>
    );
}

