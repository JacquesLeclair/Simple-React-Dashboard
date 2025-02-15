// Nova Versao
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Input, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Pagination,
} from '@windmill/react-ui';
import PageTitle from '../components/Typography/PageTitle';

const TableComponent = ({ data, onPageChange, totalResults, resultsPerPage }) => (
  <TableContainer className="mb-8 shadow-lg">
    <Table>
      <TableHeader>
        <tr>
          <TableCell>ID</TableCell>
          <TableCell>Classe Risco</TableCell>
          <TableCell>Código Risco</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Descrição Risco</TableCell>
          <TableCell>Fator Risco</TableCell>
          <TableCell>Risco</TableCell>
          <TableCell>Avaliador ID</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>
              <span className="text-sm">{row.risco_id}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.classe_risco}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.codigo_risco}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.created}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.descricao_risco}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.fator_risco}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.risco}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{row.avaliador_id}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TableFooter>
      <Pagination
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onChange={onPageChange}
        label="Table navigation"
      />
    </TableFooter>
  </TableContainer>
);

function Parametros() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/risco_parametro_consultados');  // Update the API endpoint as needed
      
        console.log('API Response:', response.data);

        const combinedData = response.data;

        setData(combinedData.slice((page - 1) * resultsPerPage, page * resultsPerPage));
        setTotalResults(combinedData.length);
      } catch (error) {
        console.error('Error fetching data...:', error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <PageTitle>Parametros de Risco</PageTitle>
      <Input
        className="mb-4"
        placeholder="Search"
        aria-label="Search"
      />
      <TableComponent
        data={data}
        onPageChange={setPage}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
      />
    </>
  );
}

export default Parametros;

