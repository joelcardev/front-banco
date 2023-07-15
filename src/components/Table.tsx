import React, { useState } from "react";
import "./Table.css";
import Loading from "./loading/LoadingComponent";
import {
  formatDateNormal,
  formatarMoedaParaBrasil,
} from "../utils/funcoesUtils";

interface TableProps {
  data: Array<{
    dataTransferencia: string;
    valor: string;
    tipo: string;
    nomeOperadorTransacao: string;
  }>;
  isLoading: boolean;
}

const Table: React.FC<TableProps> = ({ data, isLoading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (Array.isArray(data) && data.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = data?.slice(startIndex, endIndex);

      return currentItems.map((item, index) => (
        <tr key={index}>
          <td>{formatDateNormal(item.dataTransferencia)}</td>
          <td>{formatarMoedaParaBrasil(parseFloat(item?.valor))}</td>
          {item.tipo === "SAQUE" ? (
            <td style={{ color: "red" }}>{item.tipo}</td>
          ) : (
            <td style={{ color: "green" }}>{item.tipo}</td>
          )}
          <td>{item.nomeOperadorTransacao}</td>
        </tr>
      ));
    }

    return (
      <tr>
        <td colSpan={4}>Nenhum dado disponível</td>
      </tr>
    );
  };

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Dados</th>
            <th>Valentia</th>
            <th>Tipo</th>
            <th>Nome do Operador Transacionado</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          {"<<"}
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Table;
