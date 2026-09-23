import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { sellerTableColumns } from "../../helper/tableColumn";

const SellerTable = ({ sellers, pagination, handleEdit }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber || 1);

  const tableRecords = sellers?.map((item) => {
    return {
      id: item.userId,
      username: item.username,
      email: item.email,
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);

    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 overflow-hidden">
      <DataGrid
        sx={{
          border: 'none',
          color: '#0f172a',
          fontFamily: 'inherit',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',
            color: '#334155',
            fontSize: '0.8125rem',
            fontWeight: 800,
            borderBottom: '1px solid #e2e8f0',
            borderRadius: '1rem',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f8fafc',
          },
          '& .MuiTablePagination-root': {
            color: '#64748b',
            fontWeight: 600,
          },
          '& .MuiIconButton-root': {
            color: '#64748b',
          }
        }}
        rows={tableRecords || []}
        paginationMode="server"
        rowCount={pagination?.totalElements || 0}
        columns={sellerTableColumns(handleEdit)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pagination?.pageSize || 10,
              page: currentPage - 1,
            },
          },
        }}
        onPaginationModelChange={handlePaginationChange}
        disableRowSelectionOnClick
        disableColumnResize
        pagination
        autoHeight
      />
    </div>
  );
};

export default SellerTable;