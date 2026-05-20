import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* <div className="links">
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div> */}
        <div className="copy-right">© 2026 Voila Studio</div>
      </footer>
    </>
  );
};

export default MainLayout;
