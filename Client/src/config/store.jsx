/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import jwt_decode from 'jwt-decode'
import {
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiSettings, FiServer } from "react-icons/fi";

const Context = createContext();

let initialUser = "";
let initialCart = [];
let shippingData = {};
let paymentData = "";

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cartItems, setCartItems] = useState(initialCart);
  const [show, setShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentData);
  const [shippingDetails, setShippingDetails] = useState(shippingData);
  console.log("cart", cartItems);

  useEffect(()=>{
    const checkJwtExpiry= async()=> {
      const token = JSON.parse(localStorage.getItem('userinfo'))
      if(token){
        const {exp} = jwt_decode(token.access_token)
        if(exp * 1000 < Date.now()){
          localStorage.removeItem('userinfo')
          location.replace('/')
          toast.error('Token expired, please sign in to get access')
        }
      }
    }
    checkJwtExpiry()
  },[])

  //save payment method
  useEffect(() => {
    if (paymentMethod !== paymentData) {
      localStorage.setItem("paymentType", JSON.stringify(paymentMethod));
    }
  }, [paymentMethod]);

  //retrive paymentmethod from local storage
  useEffect(() => {
    const getPaymentMethod = JSON.parse(localStorage.getItem("paymentType"));
    if (getPaymentMethod) {
      setPaymentMethod(getPaymentMethod);
    }
  }, []);

  //save Shippingdetails
  useEffect(() => {
    if (shippingDetails !== shippingData) {
      localStorage.setItem("shippingInfo", JSON.stringify(shippingDetails));
    }
  }, [shippingDetails]);

  //retrive shippingDetails from local storage
  useEffect(() => {
    const getShippingDetails = JSON.parse(localStorage.getItem("shippingInfo"));
    if (shippingDetails) {
      setShippingDetails(getShippingDetails);
    }
  }, []);

  //save user to local storage
  useEffect(() => {
    if (currentUser !== initialUser) {
      localStorage.setItem("userInfo", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  //retrive user from local storage
  useEffect(() => {
    const retriveUser = JSON.parse(localStorage.getItem("userInfo"));
    if (retriveUser) {
      setCurrentUser(retriveUser);
    }
  }, []);

  // save cart to local storage
  useEffect(() => {
    if (cartItems !== initialCart) {
      localStorage.setItem("shoppingcart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //retrive cart from local storage
  useEffect(() => {
    const retriveCart = JSON.parse(localStorage.getItem("shoppingcart"));
    if (retriveCart) {
      setCartItems(retriveCart);
    }
  }, []);

  //add to cart/ increment qty
  const increaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id) == null) {
        return [...currentItems, { ...id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  //remove from cart// decrease qty

  const decreaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id).quantity === 1) {
        return currentItems.filter((item) => item._id !== id._id);
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const deleteCartItems = (id) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item._id !== id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const priceTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  //logout User
  const logOut = () => {
    localStorage.removeItem("userInfo");
    location.replace("/");
    toast.success("Logged out successfully");
  };
  const links = [
    {
      name: "Orders",
      path: `${currentUser?.user?.username}/orders`,
      icon: <AiOutlineUnorderedList />,
    },
    {
      name: "Profile",
      path: `user-profile/${currentUser?.user?.username}`,
      icon: <AiOutlineUser />,
    },
    {
      name: "Saved Items",
      path: `${currentUser?.user?.username}/saveditems`,
      icon: <AiOutlineShoppingCart />,
    },
  ];
  
  const adminLinks = [
    {
      name: "Shop orders",
      path: "allorders",
      icon: <BsFillBriefcaseFill />,
    },
    {
      name: "Manage product",
      path: "manage-product",
      icon: <FiSettings />,
    },
    {
      name: "Add product",
      path: "add-new-product",
      icon: <FiServer />,
    },
  ];

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        logOut,
        increaseCartQty,
        decreaseCartQty,
        deleteCartItems,
        cartQuantity,
        priceTotal,
        show,
        setShow,
        cartItems,
        setCartItems,
        shippingDetails,
        setShippingDetails,
        paymentMethod,
        setPaymentMethod,
        links,
        adminLinks
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
