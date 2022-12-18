import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from './pages/home';
import { Admin } from './pages/admin/admin';
import { NavBar } from './components/navbar';
import SwapApp from "swap-sdk/dist/App";
import { ShoppingCartProvider } from './context/shoppingcartlogic';
import SwapPay from 'swap-sdk/dist/apis/swappay';
import { StudentPage } from './pages/student/studentpage';



function App() {

  let swap: SwapPay = new SwapPay({ apikey: "66696e616c596561724032326973546f7567689ab5c4e2f9eed7d082f242def3d50e8dc5d4d2993276368a5e59715f3dc0ae31" });

  async function initializeddep() {
    await swap.initialized()

  }

  useEffect(() => {
    initializeddep()
      .catch(err => alert(`Check swap Api key <=> initialization failed`))

  }, [swap])

  return (
    <>
      <SwapApp swapInstance={swap}>
        <ShoppingCartProvider>
          <NavBar></NavBar>
          <Container className='mb-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='student' element={<StudentPage />} />
              <Route path='Admin' element={<Admin />} />
            </Routes>
          </Container>
        </ShoppingCartProvider >
      </SwapApp>

    </>
  );
}

export default App;
