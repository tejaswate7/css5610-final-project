import './form-input.styles.scss'
const FormInput = ({ label, ...otherProps  }) => {
    return(
        <div className="group">
            <input className="form-input shrink" {...otherProps}/>
            {
                label && <label className={`form-input-label`}>{label}</label>
            }
        </div>
    );
}

export default FormInput;