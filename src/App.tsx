import { useGlobalContext } from './GlobalContext';
import CartModal from './components/CartModal';
import NavBar from './components/NavBar';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';

function App() {
  const { state } = useGlobalContext();

  let PageComponent;
  if (state.currentPage === '/') {
    PageComponent = ShopPage;
  } else if (state.currentPage.includes('/product')) {
    PageComponent = ProductPage;
  }

  if (PageComponent) {
    return (
      <>
        <NavBar />
        <CartModal />
        <PageComponent product={PageComponent === ProductPage ? state.selectedProduct : null} />
      </>
    );
  } else {
    return null;
  }
}

export default App;