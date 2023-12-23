import { ForwardedRef, ReactNode, forwardRef, useContext } from "react";
import { TicketAnswerContextParams, TicketAnswerContext } from "./TicketAnswerContext";
import TextField from "@mui/material/TextField";


export const TicketInputChoiseField = forwardRef((params: { i: number; choseEl: ReactNode, deleteBtn: ReactNode }, ref: ForwardedRef<HTMLInputElement>): ReactNode => {
    const [variants, setVariants] = useContext<TicketAnswerContextParams>(TicketAnswerContext);
    return (
        <TextField
            multiline={false}
            fullWidth
            value={variants[params.i]}
            ref={ref}
            InputProps={{
                startAdornment: params.choseEl,
                endAdornment: params.deleteBtn
            }}
            onChange={e => {
                variants[params.i] = e.target.value;
                setVariants([...variants]);
            }} />
    );
});
