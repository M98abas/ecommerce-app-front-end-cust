import RouteProtect from "../HOC/RouteProtect";
import { useState, useEffect } from "react";
import { URL } from "../api";
import PureCard from "../components/pureCard";
import MainLayout from "../components/MainLayout";
import { Spin } from "antd";

const Home = () => {
  const [categories, setCategories]: any = useState();

  useEffect(() => {
    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${URL}/product/categories`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result))
      .catch((error) => console.log("error", error));
  }, []);
  console.log(categories);
  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Categories">
          <div className="home-content">
            {categories ? (
              categories.map((e: any) => (
                <PureCard key={e.id} item={e} link="/subCategories" />
              ))
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;
