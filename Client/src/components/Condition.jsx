import { useRef } from "react";
import { useState } from "react";
import { Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { formatCurrency } from "../utils/formatCurrency";
import ProductCard from "./ProductCard";
import useScroll from "../hooks/scroll";


export default function Condition({ data }) {
  const {scroll, scrollRef} = useScroll();
 
  const filterByNew = data
    .flatMap((item) => item)
    .filter((item) => item.condition === "New");
  
  return (
    <div className="d-flex justify-content-between align-items-center gap-4 mb-2">
      <Row className="justify-content-between align-items-center gy-4 w-100 mx-auto">
        <Col md={3}>
          <h1 className="fw-bold">NEW ARRIVALS</h1>
          <p className="small">
            Make bold fashion choices with our latest shoes, bags and
            accessories
          </p>
          <a
            href="#"
            className="fs-6 fw-bold text-black text-decoration-underline mb-4"
          >
            SHOP NOW
          </a>
        </Col>
        <Col md={8}>
          <div className="d-flex position-relative">
            <div className="d-flex gap-4 overflow-x-auto overflow-y-hidden " ref={scrollRef}>
              {filterByNew.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <BsArrowLeftCircle
              className="d-none d-lg-block position-absolute top-50 start-0 translate-middle text-black z-2"
              size="1.8rem"
              style={{ cursor: "pointer" }}
              onClick={()=> scroll ('left')}
            />
            <BsArrowRightCircle
              className=" d-none d-lg-block position-absolute top-50 start-100 translate-middle text-black z-2"
              size="1.8rem"
              style={{ cursor: "pointer" }}
              onClick={()=> scroll ('right')}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
