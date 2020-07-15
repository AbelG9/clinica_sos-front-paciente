import React from 'react';
import { Table } from 'reactstrap';

const Paciente = (props) => {
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
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Paciente;