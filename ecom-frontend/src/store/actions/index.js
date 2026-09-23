import api from "../../api/api"
import toast from "react-hot-toast";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
         });
    }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
         });
    }
};


export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        const { cart } = getState().carts;
        const { products } = getState().products;
        
        const existingItem = cart.find(
            (item) => item.productId === data.productId
        );
        const currentQty = existingItem ? Number(existingItem.quantity || 0) : 0;
        const newQty = currentQty + Number(qty || 1);

        const getProduct = products?.find(
            (item) => item.productId === data.productId
        );

        const stockLimit = getProduct ? getProduct.quantity : (data.stockQuantity || data.quantity || 100);
        const isQuantityExist = stockLimit >= newQty;

        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQty, stockQuantity: stockLimit } });
            toast.success(`${data?.productName} added to cart (${newQty})`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Stock limit reached for this item");
        }
};


export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        const { products } = getState().products;
        
        const getProduct = products?.find(
            (item) => item.productId === data.productId
        );

        const availableStock = getProduct ? getProduct.quantity : (data.stockQuantity || 100);
        const isQuantityExist = availableStock >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity, stockQuantity: availableStock },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }
    };



export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}



export const authenticateSignInUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login Success");

            localStorage.removeItem("cartItems");
            localStorage.removeItem("CHECKOUT_ADDRESS");
            dispatch(getUserCart());
            dispatch(getUserAddresses());

            const isAdmin = data?.roles?.includes("ROLE_ADMIN");
            const isSeller = data?.roles?.includes("ROLE_SELLER");

            if (isAdmin) {
                navigate("/admin");
            } else if (isSeller) {
                navigate("/admin/orders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
}


export const registerNewUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};


export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    dispatch({ type: "CLEAR_CART" });
    dispatch(clearCheckoutAddress());
    localStorage.removeItem("auth");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("CHECKOUT_ADDRESS");
    localStorage.removeItem("client-secret");
    if (navigate) navigate("/login");
};

export const addUpdateUserAddress =
     (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    dispatch({ type:"BUTTON_LOADER" });
    try {
        let savedAddress;
        if (!addressId) {
            const { data } = await api.post("/addresses", sendData);
            savedAddress = data;
        } else {
            const { data } = await api.put(`/addresses/${addressId}`, sendData);
            savedAddress = data;
        }
        if (savedAddress) {
            dispatch(selectUserCheckoutAddress(savedAddress));
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type:"IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type:"IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};


export const deleteUserAddress = 
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        await dispatch(getUserAddresses());
        const { selectedUserCheckoutAddress } = getState().auth;
        if (selectedUserCheckoutAddress?.addressId === addressId) {
            dispatch(clearCheckoutAddress());
        }
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.description || "Failed to delete address");
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occured",
         });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/addresses`);
        dispatch({type: "USER_ADDRESS", payload: data});
        const { selectedUserCheckoutAddress } = getState().auth;
        if ((!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId) && data && data.length > 0) {
            dispatch(selectUserCheckoutAddress(data[0]));
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
         });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};


export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};


export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
         });
    }
};


export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');
        
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(data.products || []));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
         });
    }
};


export const createStripePaymentSecret 
    = (sendData) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.post("/order/stripe-client-secret", sendData);
            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Failed to create payment session";
            toast.error(msg);
            dispatch({ type: "IS_ERROR", payload: msg });
        }
};


export const stripePaymentConfirmation 
    = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            const method = sendData?.paymentMethod || "online";
            const response  = await api.post(`/order/users/payments/${method}`, sendData);
            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS"});
                dispatch({ type: "CLEAR_CART"});
                toast.success("Order Placed Successfully!");
              } else {
                setErrorMesssage("Payment Failed. Please try again.");
              }
        } catch (error) {
            console.error("Order payment error:", error);
            setErrorMesssage(error?.response?.data?.message || "Payment Failed. Please try again.");
        }
};

export const analyticsAction = () => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING"});
            const { data } = await api.get('/admin/app/analytics');
            dispatch({
                type: "FETCH_ANALYTICS",
                payload: data,
            })
            dispatch({ type: "IS_SUCCESS"});
        } catch (error) {
            dispatch({ 
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch analytics data",
            });
        }
};

export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders data",
         });
    }
};

export const getUserOrders = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/orders${queryString ? `?${queryString}` : ''}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content || (Array.isArray(data) ? data : []),
            pageNumber: data.pageNumber || 0,
            pageSize: data.pageSize || 10,
            totalElements: data.totalElements || (Array.isArray(data) ? data.length : 0),
            totalPages: data.totalPages || 1,
            lastPage: data.lastPage ?? true,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user orders",
        });
    }
};



export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader, isAdmin, setOpen) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/orders/" : "/seller/orders/";
        const { data } = await api.put(`${endpoint}${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        if (setOpen) setOpen(false);
        await dispatch(getOrdersForDashboard(null, isAdmin));
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false);
    }
};


export const dashboardProductsAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
         });
    }
};


export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${sendData.id}`, sendData);
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product update failed");
     
    }
};



export const addNewProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async(dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
            await api.post(`${endpoint}${sendData.categoryId}/product`,
                sendData
            );
            toast.success("Product created successfully");
            reset();
            setOpen(false);
            await dispatch(dashboardProductsAction());
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.description || "Product creation failed");
        } finally {
            setLoader(false);
        }
    }

export const deleteProduct = 
    (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true)
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.delete(`${endpoint}${productId}`);
        toast.success("Product deleted successfully");
        setLoader(false);
        setOpenDeleteModal(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || "Some Error Occured"
        )
    }
};


export const updateProductImageFromDashboard = 
    (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${productId}/image`, formData);
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed");
     
    }
};

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successfully!");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      dispatch({ type: "CATEGORY_SUCCESS" });
      const status = err?.response?.status;
      const data = err?.response?.data;
      let msg = "Failed to create category";
      if (status === 401) {
        msg = "Authentication required. Please log in again.";
      } else if (status === 403) {
        msg = "Permission denied. Admin or Seller rights required.";
      } else if (typeof data === "string") {
        msg = data;
      } else if (data && typeof data === "object") {
        msg = data.categoryName || data.message || Object.values(data).filter(Boolean).join(", ") || msg;
      }
      toast.error(msg);
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Updated Successfully!");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      dispatch({ type: "CATEGORY_SUCCESS" });
      const status = err?.response?.status;
      const data = err?.response?.data;
      let msg = "Failed to update category";
      if (status === 401) {
        msg = "Authentication required. Please log in again.";
      } else if (status === 403) {
        msg = "Permission denied. Admin or Seller rights required.";
      } else if (typeof data === "string") {
        msg = data;
      } else if (data && typeof data === "object") {
        msg = data.categoryName || data.message || Object.values(data).filter(Boolean).join(", ") || msg;
      }
      toast.error(msg);
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Deleted Successfully!");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      dispatch({ type: "CATEGORY_SUCCESS" });
      const status = err?.response?.status;
      const data = err?.response?.data;
      let msg = "Failed to delete category";
      if (status === 401) {
        msg = "Authentication required. Please log in again.";
      } else if (status === 403) {
        msg = "Permission denied. Admin or Seller rights required.";
      } else if (typeof data === "string") {
        msg = data;
      } else if (data && typeof data === "object") {
        msg = data.message || Object.values(data).filter(Boolean).join(", ") || msg;
      }
      toast.error(msg);
    }
  };


  export const getAllSellersDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/sellers?${queryString}`);
      dispatch({
        type: "GET_SELLERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    }
  };

export const addNewDashboardSeller =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/auth/signup", sendData);
      reset();
      toast.success("Seller registered successfully!");

      await dispatch(getAllSellersDashboard());
      setOpen(false);
    } catch (err) {
      console.log(err);
      const data = err?.response?.data;
      let errorMsg = "Internal Server Error";
      if (typeof data === "string") {
        errorMsg = data;
      } else if (data && typeof data === "object") {
        errorMsg = data.message || data.password || Object.values(data).filter(Boolean).join(", ") || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setLoader(false);
    }
  };

export const updateDashboardSeller =
  (sellerId, sendData, toast, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(`/auth/sellers/${sellerId}`, sendData);
      toast.success("Seller updated successfully!");

      await dispatch(getAllSellersDashboard());
      setOpen(false);
    } catch (err) {
      console.log(err);
      const data = err?.response?.data;
      let errorMsg = "Failed to update seller";
      if (typeof data === "string") {
        errorMsg = data;
      } else if (data && typeof data === "object") {
        errorMsg = data.message || data.password || Object.values(data).filter(Boolean).join(", ") || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setLoader(false);
    }
  };