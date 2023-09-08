import { useState } from "react";
import { BackendResponse } from "./Services/api";
import { Layout, Main, Grid } from "./components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
    const [gridInfo, setGridInfo] = useState<BackendResponse>();

    return (
        <>
            <Layout>
                <Main Grid={gridInfo} UpdateGrid={setGridInfo}/>
                <Grid gridContent={gridInfo}/>
            </Layout>
            <ToastContainer />
        </>
    );
}

export default App;
