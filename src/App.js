import { useState, useEffect } from 'react';

import './App.css';

import Card from './components/Card/Card';
import Level from './components/Level/Level';
import Title from './components/Title/Title';
import Button from './components/Button/Button';

import honda from './assets/img/dodge-charger.png';
import rx7 from './assets/img/honda-civic.png';
import koenigsegg from './assets/img/koenigsegg.png';
import dodge from './assets/img/rx7.png';
import skyline from './assets/img/skyline.png';
import supra from './assets/img/supra.png';

const cardImages = [
    { "src": honda, matched: false},
    { "src": rx7, matched: false},
    { "src": koenigsegg, matched: false},
    { "src": dodge, matched: false},
    { "src": skyline, matched: false},
    { "src": supra, matched: false}
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [watchTime, setWatchTime] = useState(600);
    const [difficulty, setDifficulty] = useState('Normal')

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random(), difficulty: 'Normal' }))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    // handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), watchTime);
            }
        }
    }, [choiceOne, choiceTwo]);

    // start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, []);

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    };

    const setLevel = (level) => {
        let newWatchTime;
        switch (level) {
            case 'Facile':
                newWatchTime = 800;
                break;
            case 'Normal':
                newWatchTime = 600;
                break;
            case 'Intermédiaire':
                newWatchTime = 350;
                break;
            case 'Difficile':
                newWatchTime = 200;
                break;
            case 'Impossible':
                newWatchTime = 100;
                break;
            default:
                newWatchTime = 600;
        }
    
        const updatedCards = cards.map(card => ({ ...card, difficulty: level }));
    
        setWatchTime(newWatchTime);
        setDifficulty(level);
        setCards(updatedCards);
    };

    

    return (
        <div className="App">
            <div className="top">
                <Title title='Memory'/>

                <Button text='New Game' shuffleCards={shuffleCards}/>

                <div className="difficulty">
                    <h2>Difficulté : {difficulty}</h2>

                    <ul className="levels">
                        <Level id='Facile' setLevel={setLevel} />
                        <Level id='Normal' setLevel={setLevel} />
                        <Level id='Intermédiaire' setLevel={setLevel} />
                        <Level id='Difficile' setLevel={setLevel} />
                        <Level id='Impossible' setLevel={setLevel} />
                    </ul>
                </div>
            </div>

            <div className="main">
                <div className='card-grid'>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled}
                        />
                    ))}
                </div>
                <p className='turns'>Tours : {turns}</p>
            </div>
        </div>
    );
}

export default App