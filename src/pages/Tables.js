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
          <TableCell>Date</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Organization</TableCell>
          <TableCell>Program</TableCell>
          <TableCell>Amount..</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Category</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>
                <span className="text-sm">{cell}</span>
              </TableCell>
            ))}
            <TableCell>
              <span className="text-sm">{row.category}</span>
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

function Tables() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('/api/validacao_por_processos/1');
      
        console.log('API Response for Data 1:', response1.data);
      
        const addCategory = (items, category) => items.map(item => [...item, category]);

        const combinedData = [
          ...addCategory(response1.data.beneficios, 'beneficios'),
          ...addCategory(response1.data.criminal, 'criminal'),
          ...addCategory(response1.data.fiscal, 'fiscal'),
          ...addCategory(response1.data.processos, 'processos'),
          ...addCategory(response1.data.sancoes_administrativas, 'sancoes_administrativas')
        ];

        setData(combinedData.slice((page - 1) * resultsPerPage, page * resultsPerPage));
        setTotalResults(combinedData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <PageTitle>Validacao por processos</PageTitle>
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

export default Tables;
