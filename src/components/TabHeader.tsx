import { NavLink } from "react-router-dom";
import { navLinks } from "../utils/constants";

function TabHeader() {
  return (
    <nav className="bg-gray-100/70">
      <ul
        className="flex gap-10 list-none px-20 items-center m-0 p-0 py-2"
        role="link"
      >
        {navLinks.map((link) => (
          <li
            key={link.to}
            className="font-montserrat font-semibold tracking-wider"
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-black text-lg no-underline"
                  : "no-underline text-black/60"
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabHeader;
