import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, getUserArr, getStatusArr, setStatus } from '../store/userSlice';
import { STATUSES } from '../components/Enums';
import Loader from './Loader';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUserArr);
    const status = useSelector(getStatusArr);
    const [isEdit, setIsEdit] = useState(-1);
    const [options, setOptions] = useState([]);
    const [selected, setSelect] = useState();

    useEffect(() => {
        fnGetUsers();
    }, [])

    const fnGetUsers = async () => {
        dispatch(setStatus(STATUSES.LOADING));
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        dispatch(setUsers(data));
        dispatch(setStatus(STATUSES.IDLE));
        setOptions(data);
    }

    const handleUser = (event) => {
        let { name, value, id } = event.target;
        const updatedUser = users?.map((user) => {
            if (user.id == id && (name == "suite" || name == "street" || name == "city" || name == "zipcode" || name == "company")) {
                const _userTemp = { ...user };
                const _userAddr = (name == "company") ? { ..._userTemp.company } : { ..._userTemp.address };
                _userAddr[(name == "company") ? "name" : name] = value;

                (name == "company")
                    ? _userTemp.company = { ..._userAddr }
                    : _userTemp.address = { ..._userAddr };

                return _userTemp;
            }
            else {
                if (user.id == id) {
                    const userTemp = { ...user };
                    userTemp[name] = value;
                    return userTemp;
                }
                return user;
            }
        });
        dispatch(setUsers(updatedUser));
    }

    const handleEditUpdate = (user, targetVal) => {
        if (user.id == targetVal) {
            setIsEdit(user.id);
            setSelect(user.address.city);
        }
        else {
            dispatch(setUsers(users));
            setIsEdit(-1);
        }
    }

    if (status === STATUSES.LOADING) {
        return <Loader />
    }

    if (status === STATUSES.ERROR) {
        return <h2 className='text-danger'>Something went wrong...</h2>
    }

    return (
        <div>
            {
                <div className='tblUserWrapper'>
                    <h3 className='bg-secondary p-3 mb-0 sticky text-white userHead'><b className='text-white'>User List</b></h3>
                    <center>
                        <table className='tblUser bg-white table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Adress</th>
                                    <th>Company</th>
                                    <th>Website</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users?.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{isEdit == user.id ? <input type='textbox' className='form-control' id={user.id} name="name" onChange={(e) => handleUser(e)} value={user.name} /> : user.name}</td>
                                            <td>{isEdit == user.id ? <input type='textbox' className='form-control' id={user.id} name="email" onChange={(e) => handleUser(e)} value={user.email} /> : user.email}</td>
                                            <td>{isEdit == user.id ? <input type='textbox' className='form-control' id={user.id} name="phone" onChange={(e) => handleUser(e)} value={user.phone} /> : user.phone}</td>
                                            <td>
                                                {isEdit == user.id ?
                                                    (
                                                        <table key={user.id} className='table table-success tblCity'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Suite</th>
                                                                    <th>Street</th>
                                                                    <th>City</th>
                                                                    <th>Zipcode</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <input type='textbox' className='form-control' id={user.id} name="suite" onChange={(e) => handleUser(e)} value={user.address.suite} />
                                                                    </td>
                                                                    <td>
                                                                        <input type='textbox' className='form-control' id={user.id} name="street" onChange={(e) => handleUser(e)} value={user.address.street} />
                                                                    </td>
                                                                    <td>
                                                                        <select className='form-control' id={user.id} name="city" defaultValue={selected} onChange={(e) => handleUser(e)}>
                                                                            {options.map(option => (
                                                                                <option key={option.id} value={option.address.city}>{option.address.city}</option>
                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type='textbox' className='form-control' id={user.id} name="zipcode" onChange={(e) => handleUser(e)} value={user.address.zipcode} />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    )
                                                    :
                                                    <>
                                                        <b>
                                                            {user.address.suite + " " + user.address.street + ", "}
                                                        </b>
                                                        <br />
                                                        {user.address.city + ", " + user.address.zipcode}
                                                    </>
                                                }
                                            </td>
                                            <td>{isEdit == user.id ? <input type='textbox' className='form-control' id={user.id} name="company" onChange={(e) => handleUser(e)} value={user.company.name} /> : user.company.name}</td>
                                            <td>{isEdit == user.id ? <input type='textbox' className='form-control' id={user.id} name="website" onChange={(e) => handleUser(e)} value={user.website} /> : <a href={"https://" + user.website} target='_blank' rel="noopener noreferrer">{user.website}</a>}</td>
                                            <td>
                                                <button
                                                    onClick={(e) =>
                                                        handleEditUpdate(user, e.target.value)
                                                    }
                                                    className={(isEdit == user.id ? 'btn btn-success' : 'btn btn-secondary')}
                                                    value={isEdit == user.id ? -1 : user.id}>{isEdit == user.id ? 'Update' : 'Edit'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </center>
                </div>
            }
        </div>
    )
}

export default UserList