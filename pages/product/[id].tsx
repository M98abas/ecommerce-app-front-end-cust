import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { URL } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/RouteProtect";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../../addToCart";
import { useDispatch } from "react-redux";
const Products = () => {
  const [data, setData]: any = useState();
  const Router = useRouter();

  const { id } = Router.query;

  useEffect(() => {
    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${URL}/product/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result[0]);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [Router, id]);

  const dispatch = useDispatch();
  return (
    <RouteProtect>
      <MainLayout title="Home" subTitle="Product" hasBack>
        {!!data ? (
          <div className="single-content">
            <div className="image-wrapper">
              <img className="sp-img" src={data.image} />
              <p
                className="add-to-card"
                onClick={() => dispatch(addToCart(data))}
              >
                Add to card <ShoppingCartOutlined />
              </p>
            </div>
            <div className="name-warranty">
              <p className="sp-name">{data.name}</p>
              <p className="sp-price">$ {data.price}</p>
            </div>
            <p>{data.stock}</p>
            <p className="sp-description">{data.description}</p>
          </div>
        ) : null}
      </MainLayout>
    </RouteProtect>
  );
};

export default Products;
