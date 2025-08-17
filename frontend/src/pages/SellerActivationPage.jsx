import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import server from "../server.js";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    if (activation_token) {
        console.log("activation mein")
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/api/shop/activation`, {
            activation_token,
          });
          console.log("Activation pr res::",res);
        } catch (err) {
          console.log("Avtivation pr err::",err);
        //   console.log(err.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your Token is expired</p>
      ) : (
        <p>Your account has been created Successfully!</p>
      )}
    </div>
  );
}

export default SellerActivationPage;
