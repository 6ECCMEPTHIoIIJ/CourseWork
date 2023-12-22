import { MutableRefObject, useEffect, useState } from 'react';


import './App.css';
import TicketsListParams from './elements/tickets/TicketsListParams';
import EditableTicket from './elements/ticketsEditor/EditableTicket';

interface TicketData extends TicketsListParams {
    id: number;
}

class TicketBaseData implements TicketData {
    constructor(params:
        {
            type: number
            id: number,
            difficulty: number,
            question: string,
            description: string,
            cost: number,
            variants?: string[] | undefined
        }) {
        this.id = params.id;
        this.type = params.type;
        this.difficulty = params.difficulty;
        this.question = params.question;
        this.description = params.description;
        this.cost = params.cost;
        this.variants = params.variants;
        this.answer = { current: undefined };
    }

    id: number;
    type: number;
    difficulty: number;
    question: string;
    description: string;
    cost: number;
    variants?: string[] | undefined;
    answer: MutableRefObject<boolean[] | string | undefined>;
}

class TicketWithSingleChoiseData extends TicketBaseData {
    constructor(params:
        {
            id: number,
            difficulty: number,
            question: string,
            description: string,
            cost: number,
            variants: string[]
        }) {
        super({
            type: 0,
            id: params.id,
            difficulty: params.difficulty,
            question: params.question,
            description: params.description,
            cost: params.cost,
            variants: params.variants,
        });
    }
}

class TicketWithMultipleChoiseData extends TicketBaseData {
    constructor(params:
        {
            id: number,
            difficulty: number,
            question: string,
            description: string,
            cost: number,
            variants: string[]
        }) {
        super({
            type: 1,
            id: params.id,
            difficulty: params.difficulty,
            question: params.question,
            description: params.description,
            cost: params.cost,
            variants: params.variants,
        });
    }
}

class TicketWithInputTextData extends TicketBaseData {
    constructor(params:
        {
            id: number,
            difficulty: number,
            question: string,
            description: string,
            cost: number,
        }) {
        super({
            type: 2,
            id: params.id,
            difficulty: params.difficulty,
            question: params.question,
            description: params.description,
            cost: params.cost,
        });
    }
}

function App() {
    const [tickets, setTickets] = useState<TicketData[]>([]);

    useEffect(() => {
        setTickets([
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithSingleChoiseData(
                {
                    id: 12312,
                    difficulty: 0,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 5,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"]
                }),
            new TicketWithMultipleChoiseData(
                {
                    id: 123123442,
                    difficulty: 1,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 15,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"],
                }),
            new TicketWithMultipleChoiseData(
                {
                    id: 123123442,
                    difficulty: 1,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 15,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"],
                }),
            new TicketWithMultipleChoiseData(
                {
                    id: 123123442,
                    difficulty: 1,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 15,
                    variants: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit"],
                }),
            new TicketWithInputTextData(
                {
                    id: 1243212,
                    difficulty: 2,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 40,
                }),
            new TicketWithInputTextData(
                {
                    id: 1243212,
                    difficulty: 2,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 40,
                }),
            new TicketWithInputTextData(
                {
                    id: 1243212,
                    difficulty: 2,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 40,
                }),
            new TicketWithInputTextData(
                {
                    id: 1243212,
                    difficulty: 2,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 40,
                }),
            new TicketWithInputTextData(
                {
                    id: 1243212,
                    difficulty: 2,
                    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    cost: 40,
                })
        ]);
    }, []);

    return <div>
        <EditableTicket idx={0} />
    </div>
}

export default App;