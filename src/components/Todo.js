import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodo, STATUSES, getTodoArr } from '../store/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todo = useSelector(getTodoArr);
    const [isEdit, setIsEdit] = useState(-1);
    const [selected, setSelect] = useState(false);

    useEffect(() => {
        fnGetTodoList();
    }, [])

    const fnGetTodoList = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        dispatch(setTodo(data));
        console.log('LOG DATA 1', data);
    }

    const handleUser = async (event) => {
        let { name, value, id } = event.target;
        console.log('COMPLETE: ', name, id, value);
        const updatedTodo = await todo?.map((todos) => {
            if (todos.id == id) {
                const userTemp = {...todos};
                console.log('Completed: ', userTemp[name], value);
                userTemp[name] = value;
                return userTemp;
            }
            return todos;
        });
        dispatch(setTodo(updatedTodo));
    }

    const handleEditUpdate = (todoVal, targetVal) => {
        if (todoVal.id == targetVal) {
            setIsEdit(todoVal.id);
            setSelect(todoVal.completed);
        }
        else {
            console.log('final todo: ',todo);
            // dispatch(setTodo(todo));
            setIsEdit(-1);
        }
    }

    return (
        <div>
            {
                <div className='tblUserWrapper'>
                    <h3 className='bg-secondary p-3 mb-0 sticky text-white userHead'><b className='text-white'>Todo List</b></h3>
                    <center>
                        <table className='tblUser tblTodo bg-white table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Completed</th>
                                    <th>User Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todo &&
                                    todo?.map(todos => (
                                        <tr key={todos.id}>
                                            {/* {console.log('todos log',todos.completed+"")} */}
                                            <td>{todos.id}</td>
                                            <td>{isEdit == todos.id ? <input type='textbox' className='form-control' id={todos.id} name="title" onChange={(e) => handleUser(e)} value={todos.title} /> : todos.title}</td>
                                            <td>
                                                {isEdit == todos.id ?
                                                    (
                                                        <select className='form-control' id={todos.id} name="completed" defaultValue={selected} onChange={(e) => handleUser(e)}>
                                                            <option key="true" value="true">True</option>
                                                            <option key="false" value="false">False</option>
                                                        </select>
                                                    )
                                                    :
                                                    <>
                                                        <b>
                                                            {`${todos.completed}`}
                                                        </b>
                                                    </>
                                                }
                                            </td>
                                            <td>{isEdit == todos.id ? <input type='number' min={0} className='form-control' id={todos.id} name="userId" onChange={(e) => handleUser(e)} value={todos.userId} /> : todos.userId}</td>
                                            <td>
                                                <button
                                                    onClick={(e) =>
                                                        handleEditUpdate(todos, e.target.value)
                                                    }
                                                    className={(isEdit == todos.id ? 'btn btn-success' : 'btn btn-secondary')}
                                                    value={isEdit == todos.id ? -1 : todos.id}>{isEdit == todos.id ? 'Update' : 'Edit'}
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

export default Todo