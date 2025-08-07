import { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import { UnicornProvider } from './context/UserContext';
import { UserProvider } from './context/UserContext';
import { ProducProvider } from './context/ProductContext';
import ProductsModule from './products';
// import UnicornsModule from './users';
import UsersModule from './users';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import IndexModule from './home';


function App() {
  return (
    <BrowserRouter>
      <Fragment>

        <MenuBar />
        <IndexModule />

        <ProducProvider>
          <ProductsModule />
        </ProducProvider>

        <UserProvider>
          <UsersModule />
        </UserProvider>

        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
