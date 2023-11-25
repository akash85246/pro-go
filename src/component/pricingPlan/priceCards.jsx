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
    const subscriptionType = props.title;
    console.log(props.title, !props.oldCost);
    const amountMultiplier = !props.oldCost ? 1 : 12;
    console.log(amountMultiplier, !props.oldCost ? 1 : 12);
    const amount = props.cost * amountMultiplier;
    console.log("i am amount", amount);

    const order = await createOrder(amount);
    const orderId = order.order_id;
    return {
      key: "rzp_test_6hSqwhZWNQ9ei8",
      amount: amount,
      currency: "INR",
      name: "Pro-go",
      description: "payment for user subscription",
      image: logo,
      order_id: orderId,

      handler: function (response) {
        console.log(order);
        console.log("response", response);
        console.log(subscriptionType);
        checkPaymentStatus(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          subscriptionType
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
      setIsButtonClicked(false);
      console.log(response.error);
    });

    rzp1.open();
    setIsButtonClicked(false);
    setLoading(false);
  };

  const buttonClassName = `trialButton ${isButtonClicked ? "clickedB" : ""}`;
  const liClassName = `list ${isButtonClicked ? "clicked" : ""}`;
  const h1ClassName = `pTitle ${isButtonClicked ? "clicked" : ""}`;

  const checkPaymentStatus = async (
    order_id,
    payment_id,
    signature,
    subscriptionType = props.title
  ) => {
    console.log(order_id, payment_id, signature, subscriptionType);
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/payment/checkPayment",
        { order_id, payment_id, signature, subscriptionType },
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
        <h1 className={h1ClassName}>{props.title}</h1>
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
        {authToken && (
          <Button
            type="submit"
            class={buttonClassName}
            label="Start your 14 Day’s Trails"
            loading={loading}
          />
        )}

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
