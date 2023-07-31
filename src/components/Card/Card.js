import './Card.css';

import Back from '../../assets/img/cards-back.png'

function Card({card ,handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    const getTransitionClass = () => {
        switch (card.difficulty) {
            case 'Facile':
                return 'transition-normal';
            case 'Normal':
                return 'transition-normal';
            case 'Intermédiaire':
                return 'transition-intermediate';
            case 'Difficile':
                return 'transition-hard';
            case 'Impossible':
                return 'transition-impossible';
            default:
                return '';
        }
    };
    
    return (
        <div className='card'>
                <div className={`flip-card ${flipped ? 'flip' : ''} ${getTransitionClass()}`}>
                    <div className="front"><img src={card.src} alt="card front"/></div>
                    <div className="back"><img onClick={handleClick} src={Back} alt="card back" /></div>
                </div>
        </div>
    )
}

export default Card