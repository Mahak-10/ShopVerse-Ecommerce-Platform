import { DataGrid } from '@mui/x-data-grid';
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrder, pagination}) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
            Orders Management
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Monitor and fulfill customer transactions
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-100 px-4 py-2 rounded-2xl flex items-center gap-2 w-fit">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
            Total Orders:
          </span>
          <span className="text-base font-extrabold text-purple-800">
            {pagination?.totalElements || adminOrder?.length || 0}
          </span>
        </div>
      </div>

      {/* Light Glass-Card DataGrid Container */}
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
            columns={adminOrderTableColumn(handleEdit)}
            paginationMode='server'
            rowCount={pagination?.totalElements || 0}
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
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            autoHeight
          />
      </div>

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
          <UpdateOrderForm
            setOpen={setUpdateOpenModal}
            open={updateOpenModal}
            loader={loader}
            setLoader={setLoader}
            selectedId={selectedItem.id}
            selectedItem={selectedItem}
            />
      </Modal>
    </div>
  );
};

export default OrderTable;