import { Link } from "@tanstack/react-router";
import { useUser } from "../user-context";

export default function Header() {
  const {authorized} = useUser();
  return (
    <div>
      {!authorized && <Link to="/login">Login</Link>}
      {authorized && <Link to="/registration">Registration</Link>}
    </div>
  )
}