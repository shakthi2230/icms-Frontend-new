import Layout from "../../components/Layout";
import { Outlet } from "react-router-dom";

function LoginLayout({ title, config }) {
  return (
    <Layout title={title} config={config}>
      <Outlet />
    </Layout>
  );
}
export default LoginLayout;