import React from "react";
import styled from "styled-components";

const SCError = styled.div`
    max-width:800px;
    box-sizing=border-box;
    border:0.25rem solid red;
    padding:2rem 2rem;
    margin: 2rem auto;
    text-align:left;
    display:${(props) => (props.errorsBoolean ? "block" : "none")}`;

function Error(props) {
  const { errors, errorsBoolean } = props;
  let errorsArray = Object.values(errors);
  return (
    <SCError data-cy="error" errorsBoolean={errorsBoolean}>
      {errorsArray.map(
        (item, index) =>
          item !== "" && (
            <p>
              {index + 1}- {item}
            </p>
          )
      )}
    </SCError>
  );
}

export default Error;
