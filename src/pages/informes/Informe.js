import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Loader from '../../components/Loader';
import ModalSave from './ModalSave';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Informe = () => {
    const { state } = useContext(AuthContext);
    let userId = state.data.id;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dailyReport, setDailyReport] = useState(true);
    const [modal, setModal] = useState(false);
    const [report, setReport] = useState({
        useId: userId,
        file_name: ''
    })

    const toggle = () => setModal(!modal);

    const handleChangeReport = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            // console.log(e.target.result);
            setReport({
                ...report,
                file_name: e.target.result
            });
        };
    }

    const saveReport = async () => {
        setLoading(true);
        try {
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/informes/saveReport`, {report}, config);
            let response = await res.data;
            if(response.success){
                checkDailyReport();
                getAllReports();
                MySwal.fire({
                    icon: 'success',
                    title: 'Éxito!',
                    text: '¡El informe se guardó exitosamente!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo fue mal!',
                })
            }
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
        setModal(!modal)
    } 
    
    useEffect(() => {
        checkDailyReport();
        getAllReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkDailyReport = async () => {
        try {
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/informes/checkDailyReport`, {userId}, config);
            let response = await res.data;
            setDailyReport(response.success)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllReports = async () => {
        setLoading(true);
        try {
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/informes/getAllReports`, {userId}, config);
            let response = await res.data;
            // console.log(response);
            setData(response.reports.data);
            setLoading(false);
          } catch (e) {
              console.log(e)
              setLoading(false);
          }
    }

    return (
        <div>
            <div>
                {
                    loading ? <Loader /> :
                    dailyReport ? null : 
                    <div>
                        <button className="btn btn-info" onClick={toggle}>Añadir informe</button>
                        <ModalSave 
                            onChange={handleChangeReport}
                            saveReport={saveReport}
                            toggle={toggle}
                            modal={modal}
                        />
                    </div>
                }
            </div>
            <hr/>
            {
                loading ? <Loader /> :
                data.map((report) => {
                    return (
                        <div key={report.id} className="card my-3 shadow">
                            <div className="card-body">
                                <div>
                                    <a rel="noopener noreferrer" className="text-info" target="_blank" href={report.file_url}>{report.file_name}</a>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">{report.created_at}</small>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Informe;