import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: '0', backgroundColor: '#241c15', padding: '1%', color: 'white' }}>
            <h2 style={{ margin: '0px' }}><b className='text-warning'>CRUD - Users App</b> (using Redux toolkit)</h2>
            <div>
                <Link className="navLink" to='/'>Home</Link>
                <Link className="navLink" to='/todo'>Todo</Link>
                <Link className="navLink" to='/photo'>Photo</Link>
                <Link className="navLink" to='/album'>Album</Link>
                <Link className="navLink" to='/users'>Users</Link>
            </div>
        </div>
    )
}

export default Navbar