import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [record, setRecord] = useState([]);
    const [editid, setEditId] = useState("");
    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('login'));
        if (!admin) {
            navigate('/login');
        }
    }, [])
    const handleSubmit = () => {
        if (editid) {
            axios.put(`http://localhost:8000/crud/${editid}`, {
                name: name,
                phone: phone
            }).then((res) => {
                alert("record successfully edit")
                setEditId("");
                fetchRecord();
            }).catch((err) => {
                console.log(err);
                return false;
            })
        } else {
            axios.post(`http://localhost:8000/crud`, {
                name: name,
                phone: phone
            }).then((res) => {
                alert("record successfully add")
                fetchRecord();
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }
        setName("");
        setPhone("");
    }
    const fetchRecord = () => {
        axios.get(`http://localhost:8000/crud`).then((res) => {
            setRecord(res.data)
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
    const deleteRecord = (id) => {
        axios.delete(`http://localhost:8000/crud/${id}`).then((res) => {
            console.log(res.data);
            alert("record successfully delete");
            fetchRecord();
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
    const editRecord = async (id) => {
        try {
            let edit = await axios.get(`http://localhost:8000/crud/${id}`);
            if (edit) {
                setName(edit.data.name)
                setPhone(edit.data.phone)
                setEditId(edit.data.id);
            } else {
                console.log("record not fetch");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    useEffect(() => {
        fetchRecord();
    }, [])
    return (
        <><div className="wrapper">


            <center>
                <form>


                    <div className="input-box">
                        <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} required />
                        <i className="bx bxs-user" />
                    </div>

                    <div className="input-box">
                        <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="phone" required />
                        <i className="bx bxs-lock-alt" />
                    </div>
                    {
                        editid ? (<button className="btn" type='button' onClick={() => handleSubmit()}>Edit</button>) : (<button className="btn" type='button' onClick={() => handleSubmit()} >submit</button>)
                    }

                </form><br></br>


                <table className='col-12'>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Action</td>
                    </tr>

                    {
                        record.map((val) => {
                            return (
                                <tr>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.phone}</td>
                                    <td>
                                        <button onClick={() => deleteRecord(val.id)}>Delete</button>
                                        <button onClick={() => editRecord(val.id)}>Edit</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>

            </center>
        </div>

        </>
    );
}
export default Home;