import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import PreviewDetailsPage from "../pages/previewDetails";
import NotFound from "../pages/notFound";
import HomePage from "../pages/home";
import React, { Suspense } from "react";
import LoadingView from "../components/loadingView";
import { LinksProvider } from "../context/link";

const LinksPage = React.lazy(() => import("../pages/links"));
const PreviewCardPage = React.lazy(() => import("../pages/preview"));

export default function MainRoutes() {
  return (
    <Suspense fallback={<LoadingView />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LinksProvider />}>
            <Route path="/links" element={<LinksPage />} />
            <Route path={"/preview"} element={<PreviewCardPage />} />
          </Route>
          <Route path="/:id" element={<PreviewDetailsPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
