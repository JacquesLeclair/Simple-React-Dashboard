import React, { useState, useEffect } from "react";
import axios from 'axios';
import ConsultadoIdInput from './ConsultadoIdInput';  // Import the new component
// eslint-disable-next-line
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody } from '@windmill/react-ui';
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, SearchIcon, OutlinePersonIcon, ModalsIcon, TrashIcon } from "../icons";
import { Button } from '@windmill/react-ui';
import RoundIcon from "../components/RoundIcon";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";

function Dashboard() {
  const [consultadoId, setConsultadoId] = useState(1);  // Set default "consultado Id" to 1
  const [processData, setProcessData] = useState([]);
  const [productSoldData, setProductSoldData] = useState({});
  const [totalResults, setTotalResults] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [validationsTotal, setValidationsTotal] = useState(0);
  const [consolidationSum, setConsolidationSum] = useState(0);
  const [notListedSum, setNotListedSum] = useState(0);
  const [maxRiskClass, setMaxRiskClass] = useState('');
  const [maxRiskCount, setMaxRiskCount] = useState(0);

  // fetch data from API for process data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/validacao_por_processos/${consultadoId}`);
        setProcessData(response.data.processos);  // Adjust this based on the specific section you want to display
        setTotalResults(response.data.processos.length);  // Adjust this based on the specific section you want to display
      } catch (error) {
        console.error("There was an error fetching the data! For sure", error);
      }
    };

    fetchData();
  }, [consultadoId]);

  // fetch data from API for product sold data
  useEffect(() => {
    const fetchProductSoldData = async () => {
      try {
        const response = await axios.get(`/api/consolidacao_por_agrupamento/${consultadoId}`);
        const data = response.data;
        setProductSoldData(data);  // Adjust based on the structure of your response data
        const sum = Object.values(data).reduce((acc, value) => acc + value, 0);
        setTotalSum(sum);  // Calculate the total sum of all values
        setValidationsTotal(sum);  // Set the total number of validations
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchProductSoldData();
  }, [consultadoId]);

  // fetch data from API for consolidation data
  useEffect(() => {
    const fetchConsolidationData = async () => {
      try {
        const response = await axios.get(`/api/consolidacao_por_validacao/${consultadoId}`);
        const data = response.data;

        // Calculate the sum of values with the key "1" across all categories
        let sum1 = 0;
        for (let category in data) {
          if (data[category]['1']) {
            sum1 += data[category]['1'];
          }
        }
        setConsolidationSum(sum1);  // Set the total sum of "1" values

        // Calculate the sum of values with the key "0" across all categories
        let sum0 = 0;
        for (let category in data) {
          if (data[category]['0']) {
            sum0 += data[category]['0'];
          }
        }
        setNotListedSum(sum0);  // Set the total sum of "0" values
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchConsolidationData();
  }, [consultadoId]);

  // fetch data from API for risk class
  useEffect(() => {
    const fetchRiskClassData = async () => {
      try {
        const response = await axios.get(`/api/agrupamento_classe_risco/${consultadoId}`);
        const data = response.data;

        // Find the maximum risco_count and corresponding classe_risco
        let maxCount = 0;
        let maxClass = '';
        data.forEach(item => {
          if (item.risco_count > maxCount) {
            maxCount = item.risco_count;
            maxClass = item.classe_risco;
          }
        });
        setMaxRiskCount(maxCount);
        setMaxRiskClass(maxClass);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchRiskClassData();
  }, [consultadoId]);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <ConsultadoIdInput onConsultadoIdChange={setConsultadoId} />  {/* Add the new component */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Qtde de Validacoes"
          value={validationsTotal}
          subtitle="na ultima consulta"
        >
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-orange-500 dark:text-orange-100 text-xl"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Consta"
          value={consolidationSum}
          subtitle="na ultima consulta"
        >
          <RoundIcon
            icon={OutlinePersonIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Não Consta"
          value={notListedSum}
          subtitle="na ultima consulta"
        >
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Maior risco"
          value={maxRiskCount}
          subtitle= {maxRiskClass}
        >
          <RoundIcon
            icon={SearchIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="shadow-lg col-span-3 md:col-span-1 lg:col-span-1">
          <Card>
            <CardBody>
              <a
                className="flex items-center justify-between p-4 text-sm font-semibold bg-white dark:bg-gray-800"
                href="/app/tables">
                <div className="flex items-center text-blue-500">   
                  <span>Agrupamento de processos</span>
                </div>
                <span className="bg-purple-600 text-white p-2 rounded">
                  Month <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }}></span>
                </span>
              </a>
              <div>
                {Object.entries(productSoldData).map(([key, value]) => (
                  <div key={key}>
                    <p className="my-1 text-gray-500 text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}: {value} of {totalSum}</p>
                    <div className="h-3 my-3 relative max-w-xl rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-200 absolute"></div>
                      <div className="transition-all ease-out duration-1000 h-full bg-blue-500 relative" style={{ width: `${(value / totalSum) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2">
          <TableContainer className="shadow-lg">
            <a
              className="flex items-center justify-between p-4 text-sm font-semibold bg-white dark:bg-gray-800"
              href="/app/tables"
            >
              <div className="flex items-center text-blue-500">
                <span >Detalhamento de Processos</span>
              </div>
              <span className="bg-purple-600 text-white p-2 rounded">
                View more <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }}></span>
              </span>
            </a>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>ID</TableCell>
                  <TableCell>Fonte</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Status</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {processData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{item[3]}</TableCell>
                    <TableCell>{item[6]}</TableCell>
                    <TableCell>{item[7]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={5} // This was set statically as per your previous code
                label="Table navigation"
                onChange={() => {}}
              />
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
