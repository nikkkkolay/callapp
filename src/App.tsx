import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { WaitingList } from "./pages/WaitingList";
import { ControlList } from "./pages/ControlList";
import { Info } from "./pages/Info";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<WaitingList />} />
                <Route path="waiting" element={<WaitingList />} />
                <Route path="control" element={<ControlList />} />
                <Route path="info" element={<Info />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
