import React from "react";
import styled from "styled-components";
import Error from "./Error";

const SCLabel = styled.label`
  display: block;
  background: rgb(180, 180, 180);
  padding: 1rem 0rem 1rem 2rem;
`;

const SCRadioDiv = styled.div`
  margin: 1rem 2rem;
  line-height: 2.5;
`;

const SCIngredients = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 450px) {
    padding-top: 1rem;
    flex-direction: column;
  }
`;

const SCCheckboxDiv = styled.div`
  margin: 1rem 2rem 0rem 2rem;
  line-height: 2.5;

  @media (max-width: 450px) {
    margin: 0rem 2rem;
  }
`;

const SCInput = styled.input``;

export const pizzaSauce = ["pesto", "alfredo", "bbq", "ranch", "hummus"];

export const pizzaIngredients = [
  "Pepperoni",
  "Bacon",
  "Ham",
  "Meatballs",
  "Sausage",
  "Prosciutto",
  "Salami",
  "Chicken",
  "Beef",
  "Seafood",
  "Mushroom",
  "Pickle",
  "Cheese",
  "Olive",
  "Pepper",
  "Sesame",
  "Corn",
  "Basil",
  "Tomato",
  "Onion",
];

let ingredientDivNo = Math.ceil(pizzaIngredients.length / 10);
let ingredientDivArray = [...Array(ingredientDivNo).keys()];

const FormDiv2 = (props) => {
  const { order, handleChange, errors, errorsBoolean } = props;

  return (
    <div>
      <SCLabel htmlFor="sauce">
        Choice of Sauce (only one sauce){" "}
        <span style={{ fontWeight: "bold" }}>(Required)</span>
      </SCLabel>
      <SCRadioDiv>
        {pizzaSauce.map((item) => (
          <div>
            <SCInput
              type="radio"
              id={item}
              name="sauce"
              data-cy={item}
              onClick={handleChange}
              value={item}
              checked={order.sauce === item}
            ></SCInput>
            <label htmlFor={item}>{item.toUpperCase()} SAUCE</label>
            <br />
          </div>
        ))}
      </SCRadioDiv>
      <Error
        errorData={errors.sauce}
        errorsBoolean={errorsBoolean.sauce}
      ></Error>
      <SCLabel htmlFor="ingredients">
        Add extra ingredients{" "}
        <span style={{ fontWeight: "bold" }}>(Required)</span>
      </SCLabel>
      <SCIngredients>
        {ingredientDivArray.map((index) => (
          <SCCheckboxDiv>
            {pizzaIngredients.map(
              (item, counter) =>
                index * 10 <= counter &&
                counter < (index + 1) * 10 && (
                  <div>
                    <SCInput
                      type="checkbox"
                      id={item}
                      name="ingredients"
                      value={item}
                      data-cy={item}
                      checked={order.ingredients.includes(item)}
                      onClick={handleChange}
                    ></SCInput>
                    <label htmlFor={item}>{item}</label>
                    <br />
                  </div>
                )
            )}
          </SCCheckboxDiv>
        ))}
      </SCIngredients>
      <Error
        errorData={errors.ingredients}
        errorsBoolean={errorsBoolean.ingredients}
      ></Error>
    </div>
  );
};

export default FormDiv2;
