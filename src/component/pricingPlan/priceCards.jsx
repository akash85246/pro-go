import checkImg from "../../assets/Check_ring.svg";
import wCheckImg from "../../assets/whiteCheck_ring.svg";
import { useAuth } from "../utils/authContext";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import useRazorpay from "react-razorpay";
import axios from "axios";
import Button from "../utils/button";

export default function PCard(props) {
  const [loading, setLoading] = useState(false);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { authToken, setAuthToken } = useAuth();
  //  const pay= {
  //    order_id,
  //    razorpay_payment_id,
  //    razorpay_signature,
  //  };
  const [profileData, setProfileData] = useState({
    fullName: "",
    emailAddress: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://pro-go.onrender.com/api/get-user-details",
          {
            method: "GET",
            headers: {
              "auth-token": authToken,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data.user);
          setProfileData({
            fullName: data.user.username,
            emailAddress: data.user.email,
          });
        } else {
          console.error("Error fetching user details");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUserData();
  }, [authToken]);

  const createOrder = async (amount) => {
    try {
      amount = props.cost;
      console.log("Request Payload:", { amount: amount.toString() });

      const response = await axios.post(
        "https://pro-go.onrender.com/payment/createOrder",
        { amount: amount.toString() },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error.response.data);
      return null;
    }
  };

  const [Razorpay] = useRazorpay();
  const getRazorpayOptions = async () => {
    const order = await createOrder(props.cost * 100);
    const orderId = order.order_id;
    console.log(orderId);
    return {
      key: "rzp_test_AHWkh8XndzyXLR",
      amount: 1 * 100,
      currency: "INR",
      name: "Pro-go",
      description: "payment for user subscription",
      image: logo,
      order_id: orderId,

      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(order);
        console.log("response", response);
        checkPaymentStatus(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        )
          .then((result) => {
            console.log("Payment Status:", result);
          })
          .catch((error) => {
            console.error("Error checking payment status:", error);
          });
      },
      prefill: {
        name: profileData.fullName,
        email: profileData.emailAddress,
      },
      notes: {
        address: "Po-Go Office",
      },
      theme: {
        color: "#011C67",
      },
    };
  };
  const cardClassName = `pCard ${isButtonClicked ? "clicked" : ""}`;

  const handleCardClick = async () => {
    setLoading(true);
    setIsButtonClicked(!isButtonClicked);
    props.onSelect(props.title);

    const options = await getRazorpayOptions();

    const rzp1 = new Razorpay(options);
    console.log(rzp1);
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      setIsButtonClicked(false);
      console.log(response.error);
    });

    rzp1.open();
    setIsButtonClicked(false);
    setLoading(false);
  };

  async function fetchAdditionalPaymentDetails(paymentId) {
    try {
      // Make a request to your server or Razorpay API to get order details
      const orderDetailsResponse = await axios.get(
        `https://api.razorpay.com/v1/payments/${paymentId}`
      );

      const { order_id, signature } = orderDetailsResponse.data;

      // Log the additional details
      console.log("Order ID:", order_id);
      console.log("Signature:", signature);

      checkPaymentStatus(order_id, paymentId, signature);
    } catch (error) {
      console.error("Error fetching additional payment details:", error);
    }
  }

  const buttonClassName = `trialButton ${isButtonClicked ? "clickedB" : ""}`;
  const liClassName = `list ${isButtonClicked ? "clicked" : ""}`;

  const checkPaymentStatus = async (order_id, payment_id, signature) => {
    console.log(order_id, payment_id, signature);
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/payment/checkPayment",
        { order_id, payment_id, signature },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      console.log("i am checkPr");
      return response.data;
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  return (
    <>
      <div className={cardClassName} onClick={handleCardClick}>
        <h1 className="pTitle">{props.title}</h1>
        <h2 className="cost">
          &#8377;{props.cost}
          <sup>{props.oldCost}</sup>
        </h2>

        <p>Get key community building features, all in one place </p>
        {/* <button
          className={buttonClassName}
          onClick={() => setIsButtonClicked(!isButtonClicked)}
        >
          Start your 14 Day’s Trails
        </button> */}
        <Button
          type="submit"
          class={buttonClassName}
          label="Start your 14 Day’s Trails"
          loading={loading}
        />

        <h3>Core features:-</h3>
        <ul>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item1}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item2}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item3}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item4}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item5}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item6}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item7}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item8}</p>
            </span>
          </li>
          <li className={liClassName}>
            <span>
              <img src={isButtonClicked ? wCheckImg : checkImg}></img>
            </span>
            <span>
              <p>{props.item9}</p>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
