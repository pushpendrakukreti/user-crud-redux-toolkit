import React from 'react'

const Loader = () => {
    return (
        <div className='loader-spin'>
            <h2>Loading . . .</h2>
            <br />
            <span className="spinner-grow text-primary" role="status" />
            <span className="spinner-grow text-info" role="status" />
            <span className="spinner-grow text-success" role="status" />
            <span className="spinner-grow text-danger" role="status" />
            <span className="spinner-grow text-warning" role="status" />
        </div>
    )
}

export default Loader