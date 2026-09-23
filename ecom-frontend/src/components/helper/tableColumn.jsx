import { FaEdit, FaEye, FaImage, FaTrashAlt, FaFolder } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { formatPrice } from "../../utils/formatPrice";

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product",
    align: "left",
    minWidth: 280,
    flex: 1,
    editable: false,
    sortable: true,
    headerAlign: "left",
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50 pl-4",
    cellClassName: "text-slate-900 font-bold text-sm pl-4",
    renderHeader: () => <span className="pl-2">Product Name</span>,
    renderCell: (params) => {
      const hasImage = params.row.image && params.row.image.startsWith("http");
      return (
        <div className="flex items-center gap-3 py-1.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
            {hasImage ? (
              <img
                src={params.row.image}
                alt={params.row.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBoxOpen className="text-slate-400 text-lg" />
            )}
          </div>
          <div className="flex flex-col truncate">
            <span className="font-extrabold text-slate-900 text-sm truncate">{params.row.productName}</span>
            <span className="text-xs text-slate-400 font-mono">#{params.row.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    minWidth: 130,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-medium text-sm text-center",
    renderHeader: () => <span className="text-center">Price</span>,
    renderCell: (params) => (
      <span className="font-semibold text-slate-700 text-sm">
        {formatPrice(params.value)}
      </span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "discount",
    headerName: "Discount",
    minWidth: 110,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 text-sm text-center",
    renderHeader: () => <span className="text-center">Discount</span>,
    renderCell: (params) => {
      const discount = Math.round(Number(params.value) || 0);
      return discount > 0 ? (
        <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-200/80">
          {discount}%
        </span>
      ) : (
        <span className="inline-block bg-slate-100 text-slate-500 font-medium text-xs px-2.5 py-1 rounded-full">
          0%
        </span>
      );
    },
  },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-extrabold text-sm text-center",
    renderHeader: () => <span className="text-center">Special Price</span>,
    renderCell: (params) => (
      <span className="font-extrabold text-emerald-600 text-sm">
        {formatPrice(params.value || params.row.price)}
      </span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Stock",
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-medium text-sm text-center",
    renderHeader: () => <span className="text-center">Stock Level</span>,
    renderCell: (params) => {
      const qty = params.value || 0;
      const isOutOfStock = qty <= 0;
      const isLowStock = qty > 0 && qty < 10;

      return (
        <span
          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-extrabold tracking-wide ${
            isOutOfStock
              ? "bg-rose-100 text-rose-800 border border-rose-200"
              : isLowStock
              ? "bg-amber-100 text-amber-800 border border-amber-200"
              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : `${qty} Units`}
        </span>
      );
    },
  },
  {
    sortable: false,
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    flex: 1,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-500 font-medium text-xs text-center",
    renderHeader: () => <span>Description</span>,
    renderCell: (params) => (
      <span className="truncate text-xs text-slate-500 max-w-[220px]" title={params.value}>
        {params.value || "No description provided."}
      </span>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    minWidth: 220,
    renderHeader: () => <span>Actions</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-1.5 h-full">
          <button
            onClick={() => handleProductView(params.row)}
            title="View Details"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <FaEye className="text-sm" />
          </button>
          <button
            onClick={() => handleImageUpload(params.row)}
            title="Upload Image"
            className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer"
          >
            <FaImage className="text-sm" />
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            title="Edit Product"
            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            title="Delete Product"
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
          >
            <FaTrashAlt className="text-sm" />
          </button>
        </div>
      );
    },
  },
];


export const adminOrderTableColumn = (handleEdit) => [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Order ID",
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-bold text-sm text-center",
    renderHeader: (params) => <span className='text-center'>Order ID</span>,
    renderCell: (params) => <span className="font-extrabold text-indigo-600">#{params.value}</span>
   },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-medium text-sm text-center",
    renderHeader: (params) => <span>Customer Email</span>,
  },
  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 180,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-extrabold text-sm text-center",
    renderHeader: (params) => <span>Total Amount</span>,
    renderCell: (params) => <span className="font-extrabold text-slate-900">{formatPrice(params.value)}</span>,
  },
  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-medium text-sm text-center",
    renderHeader: (params) => <span>Order Status</span>,
    renderCell: (params) => {
      const statusText = params.value || "";
      const isAccepted = statusText.toLowerCase().includes("accepted") || statusText.toLowerCase().includes("delivered") || statusText.toLowerCase().includes("success");
      const isPending = statusText.toLowerCase().includes("pending");

      return (
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${
          isAccepted 
            ? "bg-emerald-100/90 text-emerald-800 border border-emerald-200/80" 
            : isPending 
            ? "bg-amber-100/90 text-amber-800 border border-amber-200/80" 
            : "bg-indigo-100/90 text-indigo-800 border border-indigo-200/80"
        }`}>
          {statusText}
        </span>
      );
    }
  },
  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 180,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-600 font-medium text-xs text-center",
    renderHeader: (params) => <span>Order Date</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 160,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className='flex justify-center items-center h-full'>
          <button
            onClick={() => handleEdit(params.row)}
            className='flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer'>
              <FaEdit className='text-xs'/>
              <span>Update</span>
          </button>
        </div>
      );
    },
  },
];


export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "Category ID",
    minWidth: 160,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-bold text-sm text-center",
    renderHeader: () => <span>Category ID</span>,
    renderCell: (params) => <span className="font-extrabold text-indigo-600">#{params.value}</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    minWidth: 320,
    flex: 1,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: true,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-bold text-sm text-center",
    renderHeader: () => <span>Category Name</span>,
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">
          <FaFolder className="text-sm" />
        </div>
        <span className="font-extrabold text-slate-900 text-sm">{params.value}</span>
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    minWidth: 200,
    renderHeader: () => <span>Actions</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-2 h-full">
          <button
            onClick={() => handleEdit && handleEdit(params.row)}
            className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs px-3.5 py-1.5 rounded-xl border border-indigo-200/60 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FaEdit className="text-xs" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete && handleDelete(params.row)}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs px-3.5 py-1.5 rounded-xl border border-rose-200/60 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FaTrashAlt className="text-xs" />
            <span>Delete</span>
          </button>
        </div>
      );
    },
  },
];


export const sellerTableColumns = (handleEdit) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "Seller ID",
    minWidth: 160,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-bold text-sm text-center",
    renderHeader: () => <span>Seller ID</span>,
    renderCell: (params) => <span className="font-extrabold text-indigo-600">#{params.value}</span>,
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "Seller Name",
    minWidth: 260,
    flex: 1,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: true,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-900 font-bold text-sm text-center",
    renderHeader: () => <span>Seller Name</span>,
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center uppercase">
          {params.value ? params.value.charAt(0) : "S"}
        </div>
        <span className="font-extrabold text-slate-900 text-sm">{params.value}</span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email Address",
    align: "center",
    minWidth: 300,
    flex: 1,
    editable: false,
    sortable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-medium text-sm text-center",
    renderHeader: () => <span>Email Address</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <MdOutlineEmail className="text-slate-400 text-base" />
          <span className="font-medium text-slate-700 text-sm">{params?.row?.email}</span>
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-extrabold text-xs uppercase tracking-wider bg-slate-50",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    minWidth: 160,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center h-full">
          <button
            onClick={() => handleEdit && handleEdit(params.row)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
          >
            <FaEdit className="text-xs" />
            <span>Edit</span>
          </button>
        </div>
      );
    },
  },
];