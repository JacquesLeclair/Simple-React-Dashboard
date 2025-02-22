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

function RiskDashboard() {
  const [consultadoId, setConsultadoId] = useState(1);  // Set default "consultado Id" to 1
  const [riskData, setRiskData] = useState([]);
  const [cargoAvaliador, setCargoAvaliador] = useState('');
  const [nomeAvaliador, setNomeAvaliador] = useState('');
  const [parecerRisco, setParecerRisco] = useState('');
  const [riscoCalculado, setRiscoCalculado] = useState('');
  const [riscoTotal, setRiscoTotal] = useState(0);

  // fetch data from API for risk data
  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const response = await axios.get(`/api/risco_calculado/${consultadoId}`);
        const data = response.data;
        setRiskData(data["Risco individual"]);
        setCargoAvaliador(data["Cargo_avaliador"]);
        setNomeAvaliador(data["Nome_avaliador"]);
        setParecerRisco(data["Parecer Risco"]);
        setRiscoCalculado(data["Risco calculado"]);
        setRiscoTotal(data["risco total"]);
      } catch (error) {
        console.error("There was an error fetching the data...!", error);
      }
    };

    fetchRiskData();
  }, [consultadoId]);

  return (
    <>
      <PageTitle>Parecer Consolidado</PageTitle>

      <ConsultadoIdInput onConsultadoIdChange={setConsultadoId} />  {/* Add the new component */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        
      <InfoCard
          title="Nome do Consultado"
          value="Fulano Silva dos Santos"
          subtitle="Nome"
        >
          <RoundIcon
            icon={OutlinePersonIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>
        

        <InfoCard
          title="Parecer de Risco"
          value={parecerRisco}
          subtitle="Parecer"
        >
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Risco Calculado"
          value={riscoCalculado}
          subtitle="Risco"
        >
          <RoundIcon
            icon={SearchIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Risco Total"
          value={riscoTotal}
          subtitle="Total"
        >
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-red-500 dark:text-red-100 text-xl"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Nome do Avaliador"
          value={nomeAvaliador}
          subtitle="Nome"
        >
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Cargo do Avaliador"
          value={cargoAvaliador}
          subtitle="Cargo"
        >
          <RoundIcon
            icon={OutlinePersonIcon}
            iconColorClass="text-orange-500 dark:text-orange-100 text-xl"
            bgColorClass=""
            className="mr-4"
          />
        </InfoCard>

      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="shadow-lg col-span-3">
          <Card>
            <CardBody>
              <a
                className="flex items-center justify-between p-4 text-sm font-semibold bg-white dark:bg-gray-800"
                href="/app/tables">
                <div className="flex items-center text-blue-500">   
                  <span>Detalhamento de Riscos</span>
                </div>
                <span className="bg-purple-600 text-white p-2 rounded">
                  Detalhes <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }}></span>
                </span>
              </a>
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>Classe Risco</TableCell>
                      <TableCell>Código Risco</TableCell>
                      <TableCell>Data Consulta</TableCell>
                      <TableCell>Fator Risco</TableCell>
                      <TableCell>Risco Calculado</TableCell>
                      <TableCell>Situação Consultado</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {riskData.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.classe_risco}</TableCell>
                        <TableCell>{item.codigo_risco}</TableCell>
                        <TableCell>{item.data_consulta}</TableCell>
                        <TableCell>{item.fator_risco}</TableCell>
                        <TableCell>{item.risco_calculado}</TableCell>
                        <TableCell>{item.situacao_consultado}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TableFooter>
                  <Pagination
                    totalResults={riskData.length}
                    resultsPerPage={10} // Adjust this based on your preference
                    label="Table navigation"
                    onChange={() => {}}
                  />
                </TableFooter>
              </TableContainer>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default RiskDashboard;

