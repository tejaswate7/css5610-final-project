import {useState} from "react";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss"
import Button from "../button/button.component";
import {setUser} from "../../store/user/user.reducer";
import {setCurrentUser} from "../../store/user/user.action";
import {useDispatch, useSelector} from "react-redux";

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

    const signInWithGoogle = async () =>{
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

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
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;