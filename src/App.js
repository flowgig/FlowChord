// Dependecies
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import WebFont from "webfontloader";
import { ThemeProvider } from "@material-ui/styles";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";

// Utils
import configureStore, { history } from "utils/configureStore";

// Routes
import Home from "components/routes/Home";
import NotFound from "components/routes/NotFound";

// Partials
import MainAppBar from "components/partials/MainAppBar";
import Footer from "components/partials/Footer";
import FloatingActionButtons from "components/partials/FloatingActionButtons";

// InputControllers
import ComputerKeyboardInput from "components/inputControllers/ComputerKeyboardInput";

// Stylesheets
import style from "App.module.scss";
import theme from "theme";

WebFont.load({
    google: {
        families: ["Roboto:400,700&display=swap"]
    }
});

const initialState = {};
const store = configureStore(initialState);

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <ComputerKeyboardInput />
                    <MainAppBar />
                    <div className={style.app}>
                        <Routes>
                            <Route exact={true} path="/" element={<Home />} />
                            <Route exact={true} path="/FlowChord" element={<Home />} />
                            <Route element={() => (<NotFound />)} />
                        </Routes>
                        <Footer />
                        <FloatingActionButtons />
                    </div>
                </ThemeProvider>
            </Router>
        </Provider>
    );
};

export default App;
