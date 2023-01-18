import React from "react";
import styled from "styled-components";

const SCLabel = styled.label`
  display: block;
  background: rgb(180, 180, 180);
  padding: 1rem 0rem 1rem 2rem;
`;

const SCCheckboxDiv = styled.div`
  margin: 1rem 2rem 0rem 2rem;
  line-height: 2.5;

  @media (max-width: 450px) {
    margin: 0rem 2rem;
  }
`;

const SCInput = styled.input``;

const SCNoteInput = styled.input`
  margin: 2rem 2rem 0rem 2rem;
  width: 40%;
  padding: 1rem 0.5rem;

  @media (max-width: 450px) {
    width: 70%;
  }
`;

const SCSubmitDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem;

  @media (max-width: 550px) {
    padding-top: 1rem;
    flex-direction: column;
  }
`;

const SCNumber = styled.input`
  margin: 1rem 2rem;
  width: 40%;
  max-width: 10rem;
  padding: 0.5rem 0.5rem;
  display: block;

  @media (max-width: 550px) {
    width: 90%;
    margin: 1rem auto;
  }
`;

const SCButton = styled.button`
  margin: 1rem 2rem;
  width: 40%;
  padding: 0.5rem 0.5rem;
  display: block;

  @media (max-width: 550px) {
    width: 90%;
    margin: 1rem auto;
    min-width: 10rem;
  }
`;

const FormDiv3 = (props) => {
  const {
    order,
    handleChange,
    errors,
    errorsBoolean,
    submitDisabled,
    orderPrice,
  } = props;
  return (
    <div>
      <SCLabel htmlFor="gluten">Choice of substitute</SCLabel>
      <SCCheckboxDiv>
        <SCInput
          style={{ marginBottom: "2rem" }}
          type="checkbox"
          id="gluten"
          name="gluten"
          value="gluten"
          data-cy="gluten"
          checked={order.gluten}
          onClick={handleChange}
        ></SCInput>
        <label htmlFor="gluten">Gluten Free Crust (%100)</label>
        <br />
      </SCCheckboxDiv>
      <div
        style={{
          borderBottom: "0.1rem solid black",
          paddingBottom: "2rem",
        }}
      >
        <SCLabel htmlFor="note">Special Instructions</SCLabel>
        <SCNoteInput
          type="text"
          id="note"
          name="note"
          value={order.note}
          data-cy="note-input"
          placeholder="Anything else you would like to add?"
          onChange={handleChange}
        ></SCNoteInput>
      </div>
      <SCSubmitDiv>
        <SCNumber
          type="number"
          value={order.quantity}
          onChange={handleChange}
          name="quantity"
          data-cy="quantity-input"
          min="1"
        ></SCNumber>
        <SCButton data-cy="submit" disabled={submitDisabled} type="submit">
          Add to Order $ {orderPrice ? orderPrice : 0}
        </SCButton>
      </SCSubmitDiv>
    </div>
  );
};

export default FormDiv3;
