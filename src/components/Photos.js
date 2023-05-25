import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos, STATUSES, getPhotoArr } from '../store/photoSlice';

const Photos = () => {
    const dispatch = useDispatch();
    const photo = useSelector(getPhotoArr);
    const [isEdit, setIsEdit] = useState(-1);

    useEffect(() => {
        fnGetPhotos();
    }, [])

    const fnGetPhotos = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos");
        const data = await res.json();
        const min_data = data.filter((elem) => elem.id < 50);
        // console.log('LOG DATA 1', min_data);
        dispatch(setPhotos(min_data));
    }

    const handleUser = async (event) => {
        let { name, value, id } = event.target;
        const updatedTodo = await photo?.map((photos) => {
            if (photos.id == id) {
                const userTemp = { ...photos };
                userTemp[name] = value;
                return userTemp;
            }
            return photos;
        });
        dispatch(setPhotos(updatedTodo));
    }

    const handleEditUpdate = (photoVal, targetVal) => {
        if (photoVal.id == targetVal) {
            setIsEdit(photoVal.id);
        }
        else {
            setIsEdit(-1);
        }
    }

    return (
        <div>
            {
                <div className='tblUserWrapper'>
                    <h3 className='bg-secondary p-3 mb-0 sticky text-white userHead'><b className='text-warning'>CRUD - Users App</b> (using Redux toolkit)</h3>
                    <center>
                        <table className='tblUser tblPhotos bg-white table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>URL</th>
                                    <th>Thumbnail</th>
                                    <th>Album Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {photo &&
                                    photo?.map(photos => (
                                        <tr key={photos.id}>
                                            <td>{photos.id}</td>
                                            <td>{isEdit == photos.id ? <input type='textbox' className='form-control' id={photos.id} name="title" onChange={(e) => handleUser(e)} value={photos.title} /> : photos.title}</td>
                                            <td>{isEdit == photos.id ? <input type='textbox' className='form-control' id={photos.id} name="url" onChange={(e) => handleUser(e)} value={photos.url} /> : <a href={"https://" + photos.url} target='_blank' rel="noopener noreferrer">{photos.url}</a>}</td>
                                            <td>{isEdit == photos.id ? <input type='textbox' className='form-control' id={photos.id} name="thumbnailUrl" onChange={(e) => handleUser(e)} value={photos.thumbnailUrl} /> : <img src={photos.thumbnailUrl} alt={photos.thumbnailUrl} />}</td>
                                            <td>{isEdit == photos.id ? <input type='number' min={0} className='form-control' id={photos.id} name="albumId" onChange={(e) => handleUser(e)} value={photos.albumId} /> : photos.albumId}</td>
                                            <td>
                                                <button
                                                    onClick={(e) =>
                                                        handleEditUpdate(photos, e.target.value)
                                                    }
                                                    className={(isEdit == photos.id ? 'btn btn-success' : 'btn btn-secondary')}
                                                    value={isEdit == photos.id ? -1 : photos.id}>{isEdit == photos.id ? 'Update' : 'Edit'}
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

export default Photos