import React from "react";
import styled from "styled-components";

const SCRegister = styled.div`
    max-width:800px;
    box-sizing=border-box;
    border:0.25rem solid green;
    border-radius:10%;
    background-color:rgb(191,255,197);
    color:rgb(26,141,37);
    font-weight:bold;
    padding:2rem 5rem;
    margin: 5rem auto;
    text-align:center;
    display:${(props) => (props.orderBoolean ? "none" : "block")}`;

const Register = (props) => {
  const { data, orderBoolean } = props;

  return (
    <SCRegister data-cy="register" orderBoolean={orderBoolean}>
      <p>{`Congrats... Your request with ${data.id} id number was received successfully. Pizza is on its way!!!`}</p>
      <p>Enjoy your pizza</p>
      <img
        src="https://i.ytimg.com/vi/ykgRmXZon5o/maxresdefault.jpg"
        style={{
          display: "block",
          margin: "1rem auto",
          width: "70%",
          borderRadius: "20%",
        }}
      ></img>
      <p>
        Your instruction:{" "}
        {data.note.length != 0 ? `${data.note}` : "no remarks"}
      </p>
    </SCRegister>
  );
};

export default Register;
