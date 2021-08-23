import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GymsPage from "./pages/GymsPage/GymsPage";
import GymPage from "./pages/GymPage/GymPage";
import BuddiesPage from "./pages/BuddiesPage/BuddiesPage";
import ProfileRoute from "./privateRoutes/ProfileRoute";
import CreateGymPage from "./pages/CreateGymPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path="/gyms">
        <GymsPage />
      </Route>
      <Route exact path="/gyms/new">
        <CreateGymPage />
      </Route>
      <Route exact path="/gyms/:id">
        <GymPage />
      </Route>
      <Route exact path="/findbuddies">
        <BuddiesPage />
      </Route>
      <Route exact path="/:username">
        <ProfileRoute />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Routes;
