import PropTypes from 'prop-types';

export default function Title({ children }) {
    return (
        <h3 className="text-lg font-bold w-fit text-slate-700">{children}</h3>
    )
}

Title.propTypes = {
    children: PropTypes.node,
}