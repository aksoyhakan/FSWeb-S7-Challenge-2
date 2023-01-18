import React from "react";
import styled from "styled-components";

const SCError = styled.div`
    max-width:800px;
    box-sizing=border-box;
    border:0.05rem solid red;
    border-radius:3%;
    background-color:rgb(255,200,200);
    color:red;
    padding:0rem 2rem;
    margin: 0.25rem auto 0.50rem;
    text-align:left;
    font-size:0.75rem;
    visibility:${(props) => (props.errorsBoolean ? "visible" : "hidden")}`;

function Error(props) {
  const { errorData, errorsBoolean } = props;
  console.log(errorData);
  return (
    <SCError data-cy="error" errorsBoolean={errorsBoolean}>
      <p>1- {errorData}</p>
    </SCError>
  );
}

export default Error;
