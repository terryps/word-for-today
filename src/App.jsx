import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./styles.css";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import MainLayout from "./MainLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "terms-of-use", element: <TermsOfUse /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
