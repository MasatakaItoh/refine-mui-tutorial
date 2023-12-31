import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage, notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { dataProvider } from "./dataProvider";
import { BlogPostCreate } from "./pages/blog-posts/create";
import { BlogPostEdit } from "./pages/blog-posts/edit";
import { BlogPostList } from "./pages/blog-posts/list";
import { BlogPostShow } from "./pages/blog-posts/show";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  show: "/blog-posts/show/:id",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "AC2JVo-sXFGGa-I1wXxu",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      fallback={
                        <CatchAllNavigate to="/login" />
                      }
                    >
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource resource="blog_posts" />} />
                  <Route path="blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="create" element={<BlogPostCreate />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<AuthPage type="login" />} />
                  <Route path="/register" element={<AuthPage type="register" />} />
                  <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                  <Route path="/update-password" element={<AuthPage type="updatePassword" />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
