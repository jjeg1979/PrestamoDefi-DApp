import PropTypes from 'prop-types';
export default function TextInput({ type = 'text', placeholder, value, onChange, disabled}) {
    return (
        <div>
            <input type={type}            
            onChange={onChange} 
            value={value} 
            placeholder={placeholder}
            disabled={disabled}
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out disabled:cursor-not-allowed"
            />
        </div>
    )
}

TextInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}