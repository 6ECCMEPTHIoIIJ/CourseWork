import { TextField } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

export function TicketCost(params: { idx: number; }): ReactNode {
    const costs = useRef<number[]>(((): number[] => {
        const saved = localStorage.getItem("editableCosts");
        const initial = JSON.parse(saved || "[0]");
        return initial as number[];
    })());

    const [cost, setCost] = useState<number>(() => {
        return costs.current[params.idx] || 0;
    });

    useEffect(() => {
        costs.current[params.idx] = cost;
        localStorage.setItem("editableCosts", JSON.stringify(costs.current));
    }, [params.idx, cost]);

    return (
        <TextField
            fullWidth
            multiline={false}
            label="Стоимость"
            type="number"
            placeholder="Укажите число..."
            value={cost ? cost : ""}
            onChange={e => {
                const num: number = parseInt(e.target.value);
                setCost(isNaN(num)
                    ? 0
                    : Math.min(100, Math.max(1, num)));
            }} />
    );
}
