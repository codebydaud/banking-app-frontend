import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Account.module.css";

export default function Account() {
  const { currentUser, currentAdmin, logout } = useAuth();

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <Link to="/user/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/user/transfer-funds" className={classes.link}>
            Transfer Funds
          </Link>
          <Link to="/user/profile" className={classes.link}>
            Profile
          </Link>
          <Link to="/user/transactions" className={classes.link}>
            Transactions
          </Link>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.name}</span>
          <span>${currentUser.balance}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      ) : currentAdmin ? (
        <>
          <Link to="/admin/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>Admin</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/user/signup" className={classes.link}>
            Signup
          </Link>
          <Link to="/user/login" className={classes.link}>
            Login
          </Link>
          <Link to="/admin/login" className={classes.link}>
            Admin Portal
          </Link>
        </>
      )}
    </div>
  );
}
