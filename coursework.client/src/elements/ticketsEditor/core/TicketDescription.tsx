import { ReactNode } from "react";
import { TicketInputField } from "./TicketInputField";


export const TicketDescription = (params: { idx: number; }): ReactNode => (
    <TicketInputField
        idx={params.idx}
        paramName="editableDescriptions"
        name="Пояснение"
        height="28vh"
    />
);
