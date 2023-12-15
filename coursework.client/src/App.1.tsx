import TicketBase from './elements/tickets/TicketBase';
import TicketSingleChoose from './elements/tickets/TicketSingleChoose';
import TicketMultipleChoose from './elements/tickets/TicketMultipleChoose';
import DifficultyNames from './elements/DifficultyNames';
import DifficultyViews from './elements/DifficultyViews';

export function App() {
    const ref = createRef<number>();
    const ref1 = createRef<boolean[]>([]);

    return <div>
        <ul className="w-100">
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={1}
                    question="Сколько?"
                    difficultyView={DifficultyViews.easy}
                    difficultyName={DifficultyNames.easy}
                    cost={10} />
                <TicketSingleChoose
                    idx={1}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref} />
            </li>
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={2}
                    question="Сколько?"
                    difficultyView={DifficultyViews.hard}
                    difficultyName={DifficultyNames.hard}
                    cost={10} />
                <TicketSingleChoose
                    idx={2}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref} />
            </li>
            <li className="d-flex justify-content-center">
                <TicketBase
                    idx={3}
                    question="Сколько?"
                    difficultyView={DifficultyViews.special}
                    difficultyName={DifficultyNames.special}
                    cost={10} />
                <TicketMultipleChoose
                    idx={3}
                    variants={["123", "123412", "sadas", "dsfsd"]}
                    ref={ref1} />
            </li>
        </ul>

    </div>;
}
