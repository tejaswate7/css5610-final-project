import {useState} from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss"
import Button from "../button/button.component";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/user/user.reducer";
import {setCurrentUser} from "../../store/user/user.action";
import {useNavigate} from "react-router-dom";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword, userType } = formFields;
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        if(password !== confirmPassword) {
            alert("Passwords don't match")
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            // dispatch(setUser(setCurrentUser(user)))
            await createUserDocumentFromAuth(user, { displayName, userType })
            // await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            // dispatch(setUser(user))
            // alert("Auth User Created")
            navigate('/')
        }
        catch (error){
            if(error.code === "auth/email-already-in-use"){
                alert("User already in use")
            }
            else{
                console.log("User creating encountered an error", error);
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
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="userType" type="text" required onChange={handleChange} name="userType" value={userType}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;