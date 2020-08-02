import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, Alert, Jumbotron } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Axios from 'axios';
import Loader from '../../components/Loader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TaskDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);
    const [task, setTask] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [data, setData] = useState({
        enlace: '',
        file_name: '',
        comentario: ''
    });

    const handleCancelModal = () => {
        setModal(!modal);
        setData({
            ...data,
            enlace: '',
            comentario: ''
        });
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleFile = (e) => {
        e.preventDefault();
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            // console.log(e.target.result);
            setData({
                ...data,
                file_name: e.target.result
            });
        };
    }

    const getTask = async () => {
        try {
          setLoading(true);
          let token = state.data.access_token;
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          let res = await Axios.post(`${URL}staff/getTask`, {id}, config);
          let response = await res.data;
          if (response.success) {
            setTask(response.task);
            setLoading(false);
          }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const enviar = async () => {
        try {
            setLoading(true);
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/completeTask`, {id, data}, config);
            let response = await res.data;
            // console.log(response);
            if (response.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Éxito!',
                    text: '¡El trabajo se guardó exitosamente!',
                });
                getTask();
                setLoading(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo fue mal!',
                })
                setLoading(false);
            }
        } catch (e) {
              setLoading(false);
              console.log(e)
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo fue mal!',
              })
        }
    }

    const btnSendWork = () => {
        if (task.estado === 'PENDIENTE') {
            return (
                <Fragment>
                    <button onClick={toggle} className="btn btn-warning">Agregar enlace</button>
                    {
                        data.enlace.length > 0 || data.file_name.length > 0 ? <button onClick={enviar} className="btn btn-info">Enviar trabajo!</button> : null
                    }
                </Fragment>
            )
        } else {
            return null;
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <Fragment>
            <div className="row no-gutters mb-2">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/TaskLists" onClick={goBack}>{task.estado !== 'PENDIENTE' ? 'Tarea completada' : 'Tarea pendiente'}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Detalle</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            {
                loading ? <Loader /> :
                <div className="row ">
                    <div className="col-12 col-lg-8 col-xl-7">
                        <div className="card ">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {task.asunto}
                                </h5>
                                <hr/>
                                <p>Instrucciones: </p>
                                <Jumbotron>
                                    <ReactQuill readOnly theme="snow" value={task.detalle}/>
                                </Jumbotron>
                                <div className="d-flex flex-column">
                                    <small>Fecha de entrega</small>
                                    <small className="text-danger">{task.fechafin}, {task.horafin}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Tu Trabajo
                                </h5>
                                <hr/>
                                <Alert color="dark" className="text-center">
                                    {
                                        data.enlace || 
                                        <p>
                                            enlace: <a className="text-info" target="_blank" rel="noopener noreferrer" href={task.trabajo} >{task.trabajo}</a>
                                        </p>
                                    }
                                    {
                                        data.comentario || task.comentario
                                    }
                                </Alert>
                                <Alert color="secondary" className="text-center">
                                    {
                                        task.estado === 'PENDIENTE' ?
                                        <FormGroup>
                                            <Input 
                                                accept="image/*,.pdf"
                                                value={data.file}
                                                onChange={handleFile}
                                                type="file"
                                                name="file_name"/>
                                        </FormGroup>
                                        : 
                                        <p>
                                            archivo: <a className="text-info" rel="noopener noreferrer" href={task.file_url} target="_blank">{task.trabajo_file}</a>
                                        </p>
                                    }
                                </Alert>
                                <div className="text-center">
                                    {btnSendWork()}
                                </div>
                                <Alert color={`${task.estado === 'PENDIENTE' ? 'warning' : 'success' }`} className="text-center mt-2">
                                    <small>{task.fecha_entrega || 'Trabajo aun no entregado!'}</small>
                                </Alert>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Agregar enlace</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <h5>Enlace:</h5>
                        <Input 
                            value={data.enlace}
                            onChange={handleChange}
                            type="text"
                            name="enlace" 
                            placeholder="..." />
                    </FormGroup>
                    <FormGroup>
                        <h6>Comentario:</h6>
                        <Input 
                            value={data.comentario}
                            onChange={handleChange}
                            type="textarea"
                            name="comentario" 
                            placeholder="..." />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCancelModal}>Cancelar</Button>
                    <Button color="primary" onClick={toggle}>Añadir</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default TaskDetail;