import ITicket from "./ITicket";

export function EmptyTicket(): ITicket {
    return {
        type: -1,
        data: {
            question: "",
            description: "",
            cost: 0
        },
        answer: {
            variants: [],
            single: -1,
            multiple: [],
            input: ""
        }
    }
} 