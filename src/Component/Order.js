import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import Register from "./Register";
import price from "./price";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import FormDiv from "./FormDiv";
import Error from "./Error";

const SCOrderDiv = styled.div`
max-width:800px;
box-sizing=border-box;
display:${(props) => (props.orderBoolean ? "block" : "none")}
`;

const SCFixSen = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 1rem 0;
  text-align: center;
`;

const SCFixExp = styled.p`
  margin-left: 3rem;
  font-size: 1.25rem;
`;

const SCFixImg = styled.img`
  display: block;
  width: 100%;
  margin: 0 auto;
`;
const SCHistory = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 1rem 2rem;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const SCHistoryButton = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 5%;
  border: 0.05rem solid black;
  transition: all 0.5s ease;

  &: hover {
    background: rgb(120, 120, 120);
    color: white;
  }

  @media (max-width: 450px) {
    margin: 1rem auto;
    width: 10rem;
  }
`;

const dummyOrder = {
  name: "",
  size: "Select",
  sauce: "",
  ingredients: [],
  gluten: false,
  note: "",
  quantity: 1,
};

const dummyError = {
  name: "",
  size: "",
  sauce: "",
  ingredients: "",
  gluten: "",
  note: "",
  quantity: "",
};

const dummyRegister = {
  name: "",
  size: "",
  sauce: "",
  ingredients: [],
  gluten: false,
  note: "",
  quantity: 0,
  createdAt: "",
  id: 0,
};

const charNum = 2;
const minIngredient = 4;
const maxIngredient = 10;

const Order = (props) => {
  const [order, setOrder] = useState(dummyOrder);
  const [errors, setErrors] = useState(dummyError);
  const [registerOrder, setRegisterOrder] = useState(dummyRegister);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderBoolean, setOrderBoolean] = useState(true);
  const [errorsBoolean, setErrorsBoolean] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(charNum, "At least, there must be 2 characs.")
      .matches(" ", "Please, enter your name and surname."),
    size: yup.string().required("Please, select your pizza size."),
    sauce: yup.string().required("Please, select your sauce"),
    ingredients: yup
      .array()
      .min(minIngredient, "Please, select 4 different ingredients at least")
      .max(maxIngredient, "Please, select 10 different ingredients at most"),
    gluten: yup.boolean(),
    note: yup.string(),
    quantity: yup
      .number()
      .positive("Please, select right quantity")
      .required("Please, select quantity"),
  });

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/orders", order)
      .then((response) => {
        setRegisterOrder(response.data);
        setOrderBoolean(false);
        setTimeout(() => {
          setOrderBoolean(true);
          setRegisterOrder(dummyRegister);
          setOrder(dummyOrder);
        }, 4000);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    let newPrice =
      (price[order.size] +
        price[order.sauce] +
        price.ingredients * order.ingredients.length) *
      order.quantity;
    if (order.gluten) newPrice = newPrice * price.gluten;
    console.log(newPrice);
    setOrderPrice(newPrice);
  }, [order]);

  useEffect(() => {
    formSchema
      .isValid(order)
      .then((response) => setSubmitDisabled(!response))
      .catch((err) => console.log(err));
  }, [order]);

  function orderValidation(name, value) {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
        console.log("Yup okey");
        setErrorsBoolean(false);
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
        console.log("Yup hatalı", errors);
        setErrorsBoolean(true);
      });
  }

  function handleChange(event) {
    console.log("buradayım0");
    let newValue = event.target.value;
    let newArray = [...order.ingredients];
    if (event.target.name === "ingredients") {
      newArray.indexOf(event.target.value) !== -1
        ? newArray.splice(newArray.indexOf(event.target.value), 1)
        : newArray.push(event.target.value);
      orderValidation(event.target.name, newArray);
      setOrder({ ...order, ingredients: newArray });
    } else if (event.target.name === "gluten") {
      orderValidation(event.target.name, !order.gluten);
      setOrder({ ...order, [event.target.name]: !order.gluten });
    } else {
      console.log(newValue + " " + price[newValue]);
      orderValidation(event.target.name, newValue);
      setOrder({ ...order, [event.target.name]: newValue });
    }
  }

  function handleHistory(event) {
    let locationArray = location.pathname.split("/");
    let newLocation = "";

    if (event.target.textContent === "Previous Page") {
      if (locationArray.length === 2) {
        newLocation = location.pathname;
        history.push(newLocation);
      } else if (locationArray[locationArray.length - 1] !== "1") {
        locationArray[locationArray.length - 1] = parseInt(
          locationArray[locationArray.length - 1] - 1
        );
        newLocation = locationArray.join("/");
        history.push(newLocation);
      } else {
        newLocation = locationArray.join("/");
        history.push(newLocation);
      }
    }

    if (event.target.textContent === "Next Page") {
      if (locationArray.length === 2) {
        newLocation = location.pathname + "/1";
        console.log(locationArray);
        history.push(newLocation);
      } else if (locationArray[locationArray.length - 1] !== "3") {
        console.log(locationArray);
        locationArray[locationArray.length - 1] =
          parseInt(locationArray[locationArray.length - 1]) + 1;
        newLocation = locationArray.join("/");
        history.push(newLocation);
      } else {
        console.log(locationArray);
        newLocation = locationArray.join("/");
        history.push(newLocation);
      }
    }
  }

  return (
    <>
      <SCOrderDiv orderBoolean={orderBoolean}>
        <SCFixSen>Build Your Own Pizza</SCFixSen>
        <SCFixImg src="https://rare-gallery.com/uploads/posts/820554-Fast-food-Pizza-Tomatoes-Wood-planks-Foliage-Basil.jpg" />
        <SCFixExp data-cy="order-fix-exp">Build your own pizza</SCFixExp>
        <Switch>
          <Route path={`${path}/:id`}>
            <FormDiv
              order={order}
              setOrder={setOrder}
              orderPrice={orderPrice}
              setOrderPrice={setOrderPrice}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              submitDisabled={submitDisabled}
              setSubmitDisabled={setSubmitDisabled}
            ></FormDiv>
          </Route>
        </Switch>
        <SCHistory>
          <SCHistoryButton data-cy="previous-page" onClick={handleHistory}>
            Previous Page
          </SCHistoryButton>
          <SCHistoryButton data-cy="next-page" onClick={handleHistory}>
            Next Page
          </SCHistoryButton>
        </SCHistory>
      </SCOrderDiv>
      <Error errors={errors} errorsBoolean={errorsBoolean}></Error>
      <Register data={registerOrder} orderBoolean={orderBoolean}></Register>
    </>
  );
};

export default Order;
