import { PageHeader, Popover, Avatar, Button, Tooltip } from "antd";
import { useRouter } from "next/router";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
const MainLayout = ({ children, title, subTitle, hasBack }: any) => {
  const Router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Router.push("/login");
  };
  const handelCartClick = () => {
    Router.push("/orders");
  };

  return (
    <>
      {hasBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          onBack={() => Router.back()}
          extra={[
            <Tooltip title="goto Cart">
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<ShoppingCartOutlined />}
                onClick={handelCartClick}
              />
            </Tooltip>,
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
            // <Popover trigger="click" placement="bottom" content={content}>
            //   <Avatar size="large" icon={<UserOutlined />} />
            // </Popover>,
          ]}
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          extra={[
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
          ]}
        />
      )}

      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
