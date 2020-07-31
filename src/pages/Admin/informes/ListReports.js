import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext";
import URL from '../../../config/URL';
import Axios from 'axios';
import { Table } from 'reactstrap';
import Loader from '../../../components/Loader';

const ListReports = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const getReportByUser = async () => {
        setLoading(true);
        try {
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/informes/getReportByUser`, {id}, config);
            let response = await res.data;
            if (response.success) {
                // console.log(response.reports.data);
                setData(response.reports.data);
                setLoading(false);
            }
          } catch (e) {
              console.log(e);
              setLoading(false);
          }
    }

    useEffect(() => {
        getReportByUser();
    }, [])

    return (
        <div>
            <div>
                <div>
                    {
                        loading ? <Loader /> :
                        <Table hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Informe</th>
                                <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((report) => {
                                        return (
                                            <tr key={report.id}>
                                                <th scope="row">{report.id}</th>
                                                <td><a className="text-info" rel="noopener noreferrer" target="_blank" href={report.file_url}>{report.file_name}</a></td>
                                                <td>{report.created_at}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    );
}

export default ListReports;