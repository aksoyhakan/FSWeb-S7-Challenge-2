import React from "react";
import styled from "styled-components";
import Error from "./Error";

const SCLabel = styled.label`
  display: block;
  background: rgb(180, 180, 180);
  padding: 1rem 0rem 1rem 2rem;
`;

const SCNoteInput = styled.input`
  margin: 2rem 2rem 0rem 2rem;
  width: 40%;
  padding: 1rem 0.5rem;

  @media (max-width: 450px) {
    width: 70%;
  }
`;

const SCSelect = styled.select`
  display: block;
  padding: 0.5rem;
  width: 40%;
  margin: 1.5rem 2rem 0.5rem 2rem;
`;

export const pizzaSize = [
  "Small",
  "Medium",
  "Large",
  "Extra-Large",
  "King-Size",
];

const FormDiv1 = (props) => {
  const { order, handleChange, errors, errorsBoolean } = props;

  return (
    <div>
      <SCLabel htmlFor="name">
        Please enter your name{" "}
        <span style={{ fontWeight: "bold" }}>(Required)</span>
      </SCLabel>
      <SCNoteInput
        type="text"
        id="name"
        name="name"
        value={order.name}
        data-cy="name-input"
        placeholder="Please enter your name properly"
        onChange={handleChange}
      ></SCNoteInput>
      <Error errorData={errors.name} errorsBoolean={errorsBoolean.name}></Error>
      <SCLabel htmlFor="size">
        Choice of size <span style={{ fontWeight: "bold" }}>(Required)</span>
      </SCLabel>
      <SCSelect
        name="size"
        id="size"
        value={order.size}
        onChange={handleChange}
        data-cy="select-input"
      >
        <option value="Select">Select Size...</option>
        {pizzaSize.map((item) => (
          <option value={item} data-cy={item}>
            {item}
          </option>
        ))}
      </SCSelect>
      <Error errorData={errors.size} errorsBoolean={errorsBoolean.size}></Error>
    </div>
  );
};

export default FormDiv1;
