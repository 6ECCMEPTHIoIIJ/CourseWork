import { ReactNode, useEffect, useRef, useState } from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import "./EditableTicket.css"

import TextField from '@mui/material/TextField';

export function TicketInputField(params: { idx: number; paramName: string; name: string; height?: string }): ReactNode {
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
            <TextField
                fullWidth 
                minRows={2}
                maxRows={15}
                multiline={true}
                placeholder="Введите текст..."
                value={question}
                label={params.name}
                onChange={e => {
                    setQuestion(e.target.value);
                }} />
        </InputGroup>
    );
}

