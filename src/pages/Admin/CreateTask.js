import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormGroup, Label, Input } from 'reactstrap';

const CreateTask = () => {
    const [value, setValue] = useState('');
    const [data, setData] = useState({
        idUser: '',
        asunto: '',
        detalle: '',
        fechafin: '',
        horafin: '',
        idTrabajador: '',
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
            <div className="row">
                <div className="col">
                    <form>
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
                        <button className="btn btn-success">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;