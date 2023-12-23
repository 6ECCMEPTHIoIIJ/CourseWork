import { ReactNode } from "react";
import { TicketInputField } from "./TicketInputField";


export const TicketQuestion = (params: { idx: number; }): ReactNode => (
    <TicketInputField
        idx={params.idx}
        paramName="editableQuestions"
        name="Вопрос"
        height="28vh"
    />
);
