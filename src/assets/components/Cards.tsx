import React from 'react'

interface CardsProps {

}

const Cards: React.FC<CardsProps> = () => {
    return (
        <div className='card'>
            <h3 className='card-title'>Titel</h3>
            <p className='card-p'>Episode<span>4</span></p>
            <p className='card-p'>Relesed<span>År</span></p>
            <p className='card-p'>00<span>characters</span></p>
            <button>Read more</button>
        </div>
    )
}

export default Cards