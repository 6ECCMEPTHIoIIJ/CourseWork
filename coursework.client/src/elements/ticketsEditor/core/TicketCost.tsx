import { ReactNode, useEffect, useRef, useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

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
        <InputGroup>
            <InputGroupText>Стоимость</InputGroupText>
            <FormControl
                as="input"
                type="number"
                pattern="[0-9][0-9]0"
                placeholder="Укажите число..."
                value={cost ? cost : ""}
                onChange={e => {
                    const num: number = parseInt(e.target.value);
                    setCost(isNaN(num)
                        ? 0
                        : Math.min(100, Math.max(1, num)));
                }} />
        </InputGroup>
    );
}
