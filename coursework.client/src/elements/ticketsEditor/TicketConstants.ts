import ITicket from "./ITicket";

export const EmptyTicket: ITicket = {
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