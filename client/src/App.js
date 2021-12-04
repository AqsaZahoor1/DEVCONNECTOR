import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import setAuthToken from './Redux/utils/setAuthToken';
import { loadUser } from './Redux/actions/auth';
import { useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {


  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>

      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
          <section className="container">
            {/* <ToastContainer></ToastContainer> */}
            <Routes>
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/dashboard' element={<Dashboard />} />

            </Routes>
          </section>
        </Fragment>
      </Router>

    </Provider>)

};

export default App;
