import {useState} from "react";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss"
import {setUser} from "../../reducers/user/user.reducer";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const defaultFormFields = {
    email: '',
    password: '',
}

const  SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault()

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);

            // console.log("current user", currentUser)
            // console.log("Sign In With Email and Password called");
            // console.log("Response", response.user)
            // dispatch(setUser(setCurrentUser(response.user)))
            // console.log("Dispatch Called Probably")
            // console.log("current user now", currentUser)
            resetFormFields();
            navigate('/')
        }
        catch (error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect Password for email");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with email")
                    break;
                default:
                    console.log(error)
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]:value
        })
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;