import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'reactstrap';
import Axios from 'axios';
import URL from '../../config/URL'
import Paginator from './Paginator';
import { AuthContext } from '../../contexts/AuthContext';

const Paciente = () => {
  const [data, setData] = useState();
  const [paginator, setPaginator] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { state } = useContext(AuthContext);

  const getPatient = async () => {
    try {
      let token = state.data.access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let res = await Axios.post(`${URL}staff/patientList?page=${page}`, {search}, config);
      let response = await res.data;
      setPaginator(response);
      setData(response.data);
    } catch (e) {
        console.log(e)
    }
  };

  useEffect(() => {
    getPatient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
            <input 
              className="form-control mr-sm-2" 
              type="search" 
              placeholder="Buscar" 
              name="search"
              value={search}
              onChange={handleSearch} 
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
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
                        <td>{paciente.pac_name+' '+paciente.pac_lastname}</td>
                        <td>{paciente.pac_phone}</td>
                        <td>{paciente.pac_document}</td>
                        <td>{paciente.fech_update}</td>
                      </tr>
                    )
                  })
                  :
                null
              }
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Paginator
            page={page}
            setPage={setPage}
            paginator={paginator}
          />
        </div>
      </div>
    </div>
  );
}

export default Paciente;