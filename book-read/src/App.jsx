import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./cumponents/SignIn";
import SignUp from "./cumponents/SignUp";
import TopSection from "./cumponents/TopSection";
import Main from "./cumponents/Main";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import BookClicked from "./cumponents/SearchedBook";
// import FetchedBooks from "./Redux/FetchedBooks";
import AllBooks from "./cumponents/AllBooks";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="  top-0 w-full bg-white   ">
          <TopSection />
        </div>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:id" element={<BookClicked />} />
          <Route path="/allbooks" element={<AllBooks />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
