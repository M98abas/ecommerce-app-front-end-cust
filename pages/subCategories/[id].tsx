import Cookies from "js-cookie";
import { useRouter } from "next/router";
import RouteProtect from "../../HOC/RouteProtect";
import { useState } from "react";
import { useEffect } from "react";
import { URL } from "../../api";
import MainLayout from "../../components/MainLayout";
import PureCard from "../../components/pureCard";

const SubCategories = () => {
  const Router = useRouter();
  const { id } = Router.query;
  const [data, setData]: any = useState();
  useEffect(() => {
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/category/all/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, [Router, id]);
  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Sub Categories" hasBack>
          <div className="home-content">
            {data?.products.map((e: any) => {
              return <PureCard key={e.keys} item={e} link="/product" />;
            })}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default SubCategories;
