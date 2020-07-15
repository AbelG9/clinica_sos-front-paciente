import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import Axios from 'axios';
import URL from '../../config/URL'

const Paciente = () => {
  const [data, setData] = useState();

  const getPatient = async () => {
    try {
      let token = JSON.parse(localStorage.getItem('data')).access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let res = await Axios.get(`${URL}staff/patientList`, config);
      let response = await res.data;
      setData(response.data);
    } catch (e) {
        console.log(e)
    }
  };

  useEffect(() => {
    getPatient();
  }, []);

  console.log(data)

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombres</th>
          <th>Celular</th>
          <th>DNI</th>
          <th>Triaje</th>
        </tr>
      </thead>
      <tbody>
        {
          typeof data != 'undefined' ?
          data.map((paciente, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{paciente.id_paciente}</th>
                  <td>{paciente.pac_name+' '+paciente.last_name}</td>
                  <td>{paciente.pac_phone}</td>
                  <td>{paciente.pac_document}</td>
                  <td>{'no paso'}</td>
                </tr>
              )
            })
            :
          null
        }
      </tbody>
    </Table>
  );
}

export default Paciente;