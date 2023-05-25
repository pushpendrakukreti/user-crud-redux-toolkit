import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbums, STATUSES, getAlbumArr } from '../store/albumSlice';

const Albums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(getAlbumArr);
    const [isEdit, setIsEdit] = useState(-1);

    useEffect(() => {
        fnGetAlbums();
    }, [])

    const fnGetAlbums = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        const data = await res.json();
        const min_data = data.filter((elem) => elem.id < 50);
        console.log('LOG DATA 1', data);
        dispatch(setAlbums(min_data));
    }

    const handleUser = async (event) => {
        let { name, value, id } = event.target;
        const updatedTodo = await albums?.map((album) => {
            if (album.id == id) {
                const userTemp = { ...album };
                userTemp[name] = value;
                return userTemp;
            }
            return album;
        });
        dispatch(setAlbums(updatedTodo));
    }

    const handleEditUpdate = (albumVal, targetVal) => {
        if (albumVal.id == targetVal) {
            setIsEdit(albumVal.id);
        }
        else {
            setIsEdit(-1);
        }
    }

    return (
        <div>
            {
                <div className='tblUserWrapper'>
                    <h3 className='bg-secondary p-3 mb-0 sticky text-white userHead'><b className='text-white'>Albums</b></h3>
                    <center>
                        <table className='tblUser tblAlbums bg-white table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>User Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albums &&
                                    albums?.map(album => (
                                        <tr key={album.id}>
                                            <td>{album.id}</td>
                                            <td>{isEdit == album.id ? <input type='textbox' className='form-control' id={album.id} name="title" onChange={(e) => handleUser(e)} value={album.title} /> : album.title}</td>
                                            <td>{isEdit == album.id ? <input type='number' min={0} className='form-control' id={album.id} name="userId" onChange={(e) => handleUser(e)} value={album.userId} /> : album.userId}</td>
                                            <td>
                                                <button
                                                    onClick={(e) =>
                                                        handleEditUpdate(album, e.target.value)
                                                    }
                                                    className={(isEdit == album.id ? 'btn btn-success' : 'btn btn-secondary')}
                                                    value={isEdit == album.id ? -1 : album.id}>{isEdit == album.id ? 'Update' : 'Edit'}
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

export default Albums