import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {updateUserProfile} from "../../utils/firebase/firebase.utils";


export const FormProfile = ({ cancelUpdate, userToBeEdited}) => {

    const dispatch = useDispatch();

    // normal form states
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');

    // edit form states
    const [editName, setEditName]=useState('');

    // I want to fill the state with the clicked book values as soon as the component loads
    // useEffect(()=>{
    //     setEditName(nameToBeEdited.name);
    // },[nameToBeEdited])

    // normal add books submit event
    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     let book={
    //         isbn,author,title
    //     }
    //     dispatch(postBook(book));
    //     setIsbn('');
    //     setAuthor('');
    //     setTitle('');
    // }

    // edit form submit event
    const handleEditSubmit=(e)=>{
        e.preventDefault();
        let editedUser={
            displayName: userToBeEdited.displayName,
        }
        updateUserProfile(userToBeEdited ,editedUser);
    }

    return (
                <>
                    {/* edit form when edit icon is clicked */}
                    <form className='form-group container' onSubmit={handleEditSubmit}>
                        <div className='row'>

                            <div className='col-3'>
                                <label>Name.</label>
                                <input type='text' className='form-control' required
                                       />
                            </div>
                            <div className='col-3 button-div'>
                                <button type="submit" className='btn btn-warning btn-md submit-btn'>
                                    UPDATE
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* back button */}
                    <button type="button" className='btn btn-outline-secondary btn-md back-btn'
                            onClick={cancelUpdate}>
                        BACK
                    </button>
                </>
    )
}