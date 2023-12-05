import './Style.css';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
    const [alldata, setAlldata] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const onsubmit = () => {
        let val = JSON.parse(localStorage.getItem('register'));
        let data = (val == null) ? [] : val;
        let ans = data.filter((val) => {
            if (val.email == email) {
                return val;
            }
        });
        if (ans.length != 0) {
            if (ans[0].password == password) {
                localStorage.setItem("login", JSON.stringify(ans[0]));
                toast.success("Successfully Login");
                navigate('/')
            } else {
                toast.error("Password is not valid");
            }
        } else {
            toast.error("Email is not found");
        }
    }

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('login'));
        if (admin) {
            navigate('/');
        }
    }, [])
    return (
        <>
            <div className="wrapper">
                <form action>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required />
                        <i className="bx bxs-lock-alt" />
                    </div>

                    <button type="button" className="btn" onClick={() => onsubmit()}>Login</button>
                    <div className="register-link">
                        <p>Dont't have an account? <Link to='/Register'>
                            Register
                        </Link>
                        </p>
                    </div>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

        </>
    )
}
export default Login;