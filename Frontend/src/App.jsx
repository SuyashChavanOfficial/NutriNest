import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Meal } from "./pages/Meal";
import { Workout } from "./pages/Workout";
import { Summary } from "./pages/Summary";
import { CaloriesBurnt } from "./pages/CaloriesBurnt";
import { Goal } from "./pages/Goal";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />}>
                <Route index path="meal" element={<Meal />} />
                <Route path="workout" element={<Workout />} />
                <Route path="goal" element={<Goal />} />
                <Route path="summary" element={<Summary />} />
                <Route path="calories-burnt" element={<CaloriesBurnt />} />
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
