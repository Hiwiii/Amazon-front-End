import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BasketProvider } from './components/BasketContext';
import { AuthProvider } from './utils/firebase';

import LandingPage from './Pages/LandingPage';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import Payment from './Pages/Payment';
import Orders from './Pages/Orders';

// Placeholder components for routes
const BestSellersPage = () => <div>Best Sellers Page</div>;
const NewReleasesPage = () => <div>New Releases Page</div>;
const TodaysDealsPage = () => <div>Todays Deals Page</div>;
const BooksPage = () => <div>Books Page</div>;
const GiftCardsPage = () => <div>Gift Cards & Top Up Page</div>;
const HomeGardenPage = () => <div>Home & Garden Page</div>;
const ElectronicsPage = () => <div>Electronics Page</div>;
const FashionPage = () => <div>Fashion Page</div>;
const ToysGamesPage = () => <div>Toys & Games Page</div>;
const BeautyPage = () => <div>Beauty Page</div>;
const PetSuppliesPage = () => <div>Pet Supplies Page</div>;
const PcVideoGamesPage = () => <div>PC & Video Games Page</div>;

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <BasketProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="/new-releases" element={<NewReleasesPage />} />
              <Route path="/todays-deals" element={<TodaysDealsPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/gift-cards" element={<GiftCardsPage />} />
              <Route path="/home-garden" element={<HomeGardenPage />} />
              <Route path="/electronics" element={<ElectronicsPage />} />
              <Route path="/fashion" element={<FashionPage />} />
              <Route path="/toys-games" element={<ToysGamesPage />} />
              <Route path="/beauty" element={<BeautyPage />} />
              <Route path="/pet-supplies" element={<PetSuppliesPage />} />
              <Route path="/pc-video-games" element={<PcVideoGamesPage />} />
            </Routes>
          </div>
        </BasketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
