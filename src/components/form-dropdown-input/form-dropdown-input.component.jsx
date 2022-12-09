import './form-dropdown-input.styles.scss'
const FormDropdownInput = ({ label, ...otherProps  }) => {
    return(
        <div className="group-dropdown">
            {
                label &&
                <>
                    <label className={`shrink form-dropdown-input-label`}>{label}</label>
                    <select  className="form-dropdown-input" {...otherProps}>
                        <option className="form-dropdown-input-label" value="normal">Normal</option>
                        <option className="form-dropdown-input-label" value="critic">Critic</option>
                        <option className="form-dropdown-input-label" value="admin">Admin</option>
                    </select>
                </>

            }
        </div>
    );
}

export default FormDropdownInput;