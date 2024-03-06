import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

export default function ProductDetails() {
  const [detailes, setDetailes] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function getProductdetailes(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetailes(data.data);
    setLoading(false);
    console.log(data.data);
  }

  useEffect(() => {
    getProductdetailes(id);
  }, []);
  return (
    <>
      {loading ? (
        <div className="row justify-content-center align-items-center vh-100">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
          
        <div className="row align-items-center py-5 mt-5">
          <div className="col-md-4">
            <img src={detailes.imageCover} className="w-100 rounded" alt="" />
          </div>
          <div className="col-md-8">
            <div className="details">
              <h3 className="h5">{detailes.title}</h3>
              <p className="py-3">{detailes.description}</p>
              <span className="font-sm text-main ">
                {detailes.category.name}
              </span>
              <div className="d-flex py-3 justify-content-between align-items-center">
                <span className="font-sm">{detailes.price} EGP</span>
                <span className="font-sm">
                  <i className="fas fa-star rating-color me-1"></i>
                  {detailes.ratingsAverage}
                </span>
              </div>
              <button className="btn bg-main text-main-light w-100 btn-sm ">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
