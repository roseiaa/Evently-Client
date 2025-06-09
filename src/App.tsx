import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import ThemeProvider from "./theme";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import HomePage from "./pages/private/home";
import ProfilePage from "./pages/profile";
import PublicLayout from "./layouts/publicLayout";
import PrivateLayout from "./layouts/privateLayout";
import EventPage from "./pages/private/admin/events";
import EditEventPage from "./pages/private/admin/events/edit";
import CreateEventPage from "./pages/private/admin/events/create";
import EventInfoPage from "./pages/private/event";
import UserBookingsPage from "./pages/profile/bookings";
import AdminBookings from "./pages/private/admin/bookings";
import UsersPage from "./pages/private/admin/users";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicLayout>
                    <RegisterPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateLayout>
                    <HomePage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <PrivateLayout>
                    <EventInfoPage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateLayout>
                    <ProfilePage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/profile/bookings"
                element={
                  <PrivateLayout>
                    <UserBookingsPage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <PrivateLayout>
                    <EventPage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/users/"
                element={
                  <PrivateLayout>
                    <UsersPage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <PrivateLayout>
                    <AdminBookings />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/events/create"
                element={
                  <PrivateLayout>
                    <CreateEventPage />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/events/edit/:id"
                element={
                  <PrivateLayout>
                    <EditEventPage />
                  </PrivateLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
