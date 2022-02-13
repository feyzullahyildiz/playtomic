import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNote, deleteNote, loadNotes } from '../../../redux/action/note';
import { useAppSelector } from '../../../redux/hooks';
import './style.scss';
export const SecretDashboard = () => {
    const dispatch = useDispatch();
    const [textValue, setTextValue] = useState('');
    const userNotes = useAppSelector(state => state.note.data)
    useEffect(() => {
        dispatch(loadNotes())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddNote = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(addNote(textValue));
        setTextValue('');
    }
    const onDeleteNote = (id: number) => {
        dispatch(deleteNote(id));

    }
    return (
        <div className='SecretDashboard'>
            <h3>Secret Notes</h3>

            <form onSubmit={onAddNote} className="note-add-container">
                <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <button type='submit'>Add</button>
            </form>
            <div className="list">
                {userNotes.map(item => (
                    <div className='list-item' key={item.id}>
                        <img className='delete-icon'
                            onClick={() => onDeleteNote(item.id)}
                            src={process.env.PUBLIC_URL + 'assets/delete.svg'} alt="" />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>

    )
}
