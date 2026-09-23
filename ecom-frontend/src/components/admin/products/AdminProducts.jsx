import React, { useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumn } from '../../helper/tableColumn';
import { useDashboardProductFilter } from '../../../hooks/useProductFilter';
import Modal from '../../shared/Modal';
import AddProductForm from './AddProductForm';
import DeleteModal from '../../shared/DeleteModal';
import { deleteProduct } from '../../../store/actions';
import toast from 'react-hot-toast';
import ImageUploadForm from './ImageUploadForm';
import ProductViewModal from '../../shared/ProductViewModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const AdminProducts = () => {
  // const products = [{ "productId": 52, "productName": "iPad Pro", "image": "http://localhost:8080/images/7a7b38c4-2342-4d10-89e9-2c5b3c4fdb44.png", "description": "High-performance Tablet with a 4K display and powerful camera", "quantity": 30, "price": 1800.0, "discount": 43.0, "specialPrice": 1026.0 }, { "productId": 2, "productName": "iPhone 16 Pro Max", "image": "http://localhost:8080/images/22185fd1-024a-4708-9a10-832b8a50bfde.png", "description": "High-performance phone with a 4K display and powerful camera", "quantity": 19, "price": 1400.0, "discount": 23.0, "specialPrice": 1078.0 }];
  // const pagination = { pageNumber: 0, pageSize: 50, totalElements: 11, totalPages: 1, lastPage: true };
  
  const {products, pagination} = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [currentPage, setCurrentPage] = useState(
      pagination?.pageNumber + 1 || 1
    );

  const dispatch = useDispatch();
  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useDashboardProductFilter();

  const tableRecords = products?.map((item) => {
  return {
    id: item.productId,
    productName: item.productName,
    description: item.description,
    discount: item.discount,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    specialPrice: item.specialPrice,
  }
});

const handleEdit = (product) => {
  setSelectedProduct(product);
  setOpenUpdateModal(true);
};

const handleDelete = (product) => {
  setSelectedProduct(product);
  setOpenDeleteModal(true);
};

const handleImageUpload = (product) => {
  setSelectedProduct(product);
  setOpenImageUploadModal(true);
};

const handleProductView = (product) => {
  setSelectedProduct(product);
  setOpenProductViewModal(true);
};


const handlePaginationChange = (paginationModel) => {
  const page = paginationModel.page + 1;
  setCurrentPage(page);
  params.set("page", page.toString());
  navigate(`${pathname}?${params}`)
};


const onDeleteHandler = () => {
  dispatch(deleteProduct(setLoader, selectedProduct?.id, toast, setOpenDeleteModal, isAdmin));
};

  const emptyProduct = !products || products?.length === 0;
  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Products Catalog
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage inventory, pricing, stock levels, and product media
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-purple-50 border border-purple-100 px-4 py-2 rounded-2xl flex items-center gap-2 w-fit">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Total Products:
            </span>
            <span className="text-base font-extrabold text-purple-800">
              {pagination?.totalElements || products?.length || 0}
            </span>
          </div>

          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-5 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <MdAddShoppingCart className="text-lg" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div className="bg-white rounded-3xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center text-center py-16 text-slate-500">
              <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <FaBoxOpen size={36} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                No Products Created Yet
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-sm">
                Get started by adding your first store item to display in your product catalog.
              </p>
              <button
                onClick={() => setOpenAddModal(true)}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-6 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <MdAddShoppingCart className="text-lg" />
                <span>Add Product Now</span>
              </button>
            </div>
          ) : (
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
                rows={tableRecords}
                columns={adminProductTableColumn(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView
                )}
                paginationMode="server"
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
          )}
        </>
      )}

    <Modal
      open={openUpdateModal || openAddModal}
      setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
      title={openUpdateModal ? "Update Product" : "Add Product"}>
        <AddProductForm 
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
          />
    </Modal>


    <Modal
      open={openImageUploadModal}
      setOpen={setOpenImageUploadModal}
      title="Add Product Image">
        <ImageUploadForm 
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
          />
    </Modal>


    <DeleteModal
      open={openDeleteModal}
      setOpen={setOpenDeleteModal}
      loader={loader}
      title="Delete Product"
      onDeleteHandler={onDeleteHandler} />

      <ProductViewModal 
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />
    </div>
  )
}

export default AdminProducts