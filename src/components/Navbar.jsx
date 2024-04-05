import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="flex gap-5 text-xl">
          {/*<Link to="/" className="text-gray-500 hover:text-gray-900">Inicio</Link> */}
          <Link to="/usuarios" className="text-gray-500 hover:text-gray-900">Usuarios</Link>
          <Link to="/prestamos" className="text-gray-500 hover:text-gray-900">Prestamos</Link>
        </nav>
    );
}