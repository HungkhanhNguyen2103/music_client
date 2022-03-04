import { BrowserRouter , HashRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import {HomePage ,LoginPage ,ErrorPage,ArtistDetialPage, PlayListAllPage ,SearchRenderPage} from './pages'
import { useSelector } from 'react-redux';
import { State } from './stores/reducer';
import { useEffect } from 'react';


function App() {


            
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path={ROUTES.HOME } element={<HomePage/>}></Route>
          <Route path={ROUTES.DASHBOARD } element={<HomePage/>}></Route>
          <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>
          <Route path={ROUTES.ARTIST} element={<ArtistDetialPage />}></Route>
          <Route path={ROUTES.SEARCH} element={<SearchRenderPage />}></Route>
          <Route path={ROUTES.PLAYLIST} element={<PlayListAllPage />}></Route>
          <Route path={ROUTES.MY_PLAYLIST} element={<PlayListAllPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path={ROUTES.ERROR} element={<ErrorPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
