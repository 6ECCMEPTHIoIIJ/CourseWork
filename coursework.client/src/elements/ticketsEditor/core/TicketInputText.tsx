import { ReactNode } from "react";
import { TicketInputField } from "./TicketInputField";

export const TicketInputText = (params: { idx: number; }): ReactNode => (
    <TicketInputField
        idx={params.idx}
        paramName="editableInputText"
        name="Ответ"
        height="50vh"
    />
);
