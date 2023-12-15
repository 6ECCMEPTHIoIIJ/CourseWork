import TicketBase from './elements/TicketBase';
import DifficultyNames from './elements/difficultyNames';
import DifficultyViews from './elements/difficultyViews';

import './App.css';

function App() {
    return <>{TicketBase(1, "Сколько?", DifficultyViews.easy, DifficultyNames.easy, 10)}</>
}

export default App;