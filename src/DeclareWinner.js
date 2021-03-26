import React from 'react'
import PropTypes from 'prop-types'
import './DeclareWinner.css';

function DeclareWinner({message}) {
    const { location } = window;
    return (
        <div className='declare-winner'>
            <div className='content'>
                <span style={{display: 'block'}}>{message}</span>
                <button type='button' className='retry-button' onClick={() => location.reload()}>Retry</button>
            </div>
        </div>
    )
}

DeclareWinner.propTypes = {
    message: PropTypes.string
}

export default DeclareWinner
