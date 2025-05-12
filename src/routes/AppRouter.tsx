import { Route, Routes } from "react-router-dom";
import ViewHM from "../screen/ViewHM";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element="Landing"></Route>
        <Route path="/view/:gender" element={<ViewHM />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
