import TicketBase from './elements/tickets/TicketBase';
import TicketSingleChoise from './elements/tickets/TicketSingleChoise';
import TicketMultipleChoise from './elements/tickets/TicketMultipleChoise';
import DifficultyNames from './elements/DifficultyNames';
import DifficultyViews from './elements/DifficultyViews';

import { useRef } from 'react';


import './App.css';

function App() {
    const ref = useRef<boolean[]>([false, false, false, false]);
    const ref1 = useRef<boolean[]>([false, false, false, false]);

    return <div >
        <ul className="w-100">
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={1}
                    question="Сколько?"
                    difficultyView={DifficultyViews.easy}
                    difficultyName={DifficultyNames.easy}
                    cost={10}
                />
                <TicketSingleChoise
                    idx={1}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref}
                />
            </li>
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={2}
                    question="Сколько?"
                    difficultyView={DifficultyViews.hard}
                    difficultyName={DifficultyNames.hard}
                    cost={10}
                />
                <TicketSingleChoise
                    idx={2}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref}
                />
            </li>
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={3}
                    question="Сколько?"
                    difficultyView={DifficultyViews.special}
                    difficultyName={DifficultyNames.special}
                    cost={10}
                />
                <TicketMultipleChoise
                    idx={3}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref1}
                />
            </li>
        </ul>
    </div>
}

export default App;