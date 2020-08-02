import React, { useState, useContext } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormGroup, Input } from 'reactstrap';
import { AuthContext } from '../../contexts/AuthContext';
import Axios from 'axios';
import URL from '../../config/URL';
import Loader from '../../components/Loader';

const CreateTask = () => {
    let location = useLocation();
    let dataUser = typeof location.state === "undefined" ? '' : location.state.data;
    let history = useHistory();
    let { id } = useParams();
    const { state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [data, setData] = useState({
        idUser: state.data.id,
        asunto: '',
        detalle: '',
        fechafin: '',
        horafin: '',
        idTrabajador: id,
    });

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link',
    ]

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value, 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
          let token = state.data.access_token;
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          let res = await Axios.post(`${URL}staff/addTask`, {data, value}, config);
          let response = await res.data;
          if (response.success) {
            history.push("/Tasks");
            setLoading(false);
          }
          setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem><Link to="/Tasks">Crear tareas</Link></BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Asignar tarea</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <p><strong>Usuario: </strong> {dataUser.full_name}</p>
                <p><strong>Rol: </strong> {dataUser.role}</p>
                <p><strong>Celular: </strong> {dataUser.phone}</p>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <h5>Asunto: </h5>
                            <Input 
                                value={data.asunto}
                                onChange={handleChange}
                                type="text" 
                                name="asunto" 
                                placeholder="Titulo de la tarea" />
                        </FormGroup>
                        <ReactQuill 
                            modules={modules}
                            formats={formats}
                            theme="snow" 
                            value={value} 
                            onChange={setValue}/>
                        <div className="d-flex flex-row">
                            <FormGroup>
                                <h5>Fecha fin: </h5>
                                <Input 
                                    value={data.fechafin}
                                    onChange={handleChange}
                                    type="date" 
                                    name="fechafin" />
                            </FormGroup>
                            <FormGroup>
                                <h5>Hora fin: </h5>
                                <Input 
                                    value={data.horafin}
                                    onChange={handleChange}
                                    type="time" 
                                    name="horafin" />
                            </FormGroup>
                        </div>
                        {
                            loading ? <Loader /> : 
                            <button className="btn btn-success">Guardar</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;