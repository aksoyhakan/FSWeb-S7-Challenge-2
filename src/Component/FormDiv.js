import React from "react";
import { useParams, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import FormDiv1 from "./FormDiv1";
import FormDiv2 from "./FormDiv2";
import FormDiv3 from "./FormDiv3";

const SCOrderForm = styled.form``;

const FormDiv = (props) => {
  const { id } = useParams();

  const {
    order,
    orderPrice,
    handleChange,
    handleSubmit,
    submitDisabled,
    errors,
    errorsBoolean,
    path,
  } = props;

  return (
    <SCOrderForm onSubmit={handleSubmit}>
      <Switch>
        <Route path={`${path}/1`}>
          <FormDiv1
            order={order}
            handleChange={handleChange}
            errors={errors}
            errorsBoolean={errorsBoolean}
          />
        </Route>
        <Route path={`${path}/2`}>
          <FormDiv2
            order={order}
            handleChange={handleChange}
            errors={errors}
            errorsBoolean={errorsBoolean}
          />
        </Route>
        <Route path={`${path}/3`}>
          <FormDiv3
            order={order}
            handleChange={handleChange}
            errors={errors}
            errorsBoolean={errorsBoolean}
            submitDisabled={submitDisabled}
            orderPrice={orderPrice}
          />
        </Route>
      </Switch>
    </SCOrderForm>
  );
};

export default FormDiv;
