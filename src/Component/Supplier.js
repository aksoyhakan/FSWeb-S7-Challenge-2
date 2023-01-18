import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

const SCSupplierDiv = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SCDeliveryDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SCDelivery = styled.p`
  padding: 0.25rem 0.5rem;
  border: 0.1rem solid rgb(120, 120, 120);
  color: rgb(120, 120, 120);
  border-radius: 5%;
  transition: all 0.5s ease;

  &: hover {
    background: rgb(120, 120, 120);
    color: white;
  }
`;

const Supplier = (props) => {
  const { supplierInfo } = props;
  const { url } = useRouteMatch();

  return supplierInfo.name.includes("Pizza") ? (
    <Link
      style={{
        textDecoration: "none",
        width: "250px",
        display: "flex",
        color: "black",
        justifyContent: "space-between",
      }}
      to={`${url}order`}
    >
      <SCSupplierDiv data-cy={supplierInfo.name}>
        <img
          styled={{ display: "block" }}
          src={supplierInfo.url}
          width="200px"
          height="200px"
        ></img>

        <p>{supplierInfo.name}</p>
        <p>
          {supplierInfo.detailInfo.map((item, index) => (
            <span key={index + 1}>
              {item}
              {index !== supplierInfo.detailInfo.length - 1 && "-"}
            </span>
          ))}
        </p>
        <SCDeliveryDiv>
          <SCDelivery>{supplierInfo.delivery}</SCDelivery>
          <SCDelivery>{supplierInfo.fee}</SCDelivery>
        </SCDeliveryDiv>
      </SCSupplierDiv>
    </Link>
  ) : (
    <SCSupplierDiv data-cy={supplierInfo.name}>
      <img
        styled={{ display: "block" }}
        src={supplierInfo.url}
        width="200px"
        height="200px"
      ></img>

      <p>{supplierInfo.name}</p>
      <p>
        {supplierInfo.detailInfo.map((item, index) => (
          <span key={index + 1}>
            {item}
            {index !== supplierInfo.detailInfo.length - 1 && "-"}
          </span>
        ))}
      </p>
      <SCDeliveryDiv>
        <SCDelivery>{supplierInfo.delivery}</SCDelivery>
        <SCDelivery>{supplierInfo.fee}</SCDelivery>
      </SCDeliveryDiv>
    </SCSupplierDiv>
  );
};

export default Supplier;
