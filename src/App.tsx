import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DailyVerse from "./components/DailyVerse";
import UpcomingEvents from "./components/UpcomingEvents";
import CommunityFeed from "./components/CommunityFeed";
import Footer from "./components/Footer";
import About from "./components/About"; // Corrected import path
import Brigadespage from "./components/Brigades/Brigadespage";
import BrigadeDetailPage from "./components/Brigades/Brigadesdetailpage";
import FellowshipsPage from "./components/Fellowships/Fellowshipspage";
import FellowshipDetailPage from "./components/Fellowships/FellowshipsDetailPage";
import SermonsPage from "./components/Sermons/SermonsPage";

// const Brigades = () => <div className="pt-20">Brigades Page</div>;
// const Fellowship = () => <div className="pt-20">Fellowship Groups Page</div>;
// const Sermons = () => <div className="pt-20">Sermons Page</div>;
const Events = () => <div className="pt-20">Events Page</div>;
const Contact = () => <div className="pt-20">Contact Page</div>;

const HomePage = () => (
  <div className="flex flex-col">
    <Hero />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UpcomingEvents />
        </div>
        <div>
          <DailyVerse />
        </div>
      </div>
      <div className="mt-8">
        <CommunityFeed />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/brigades" element={<Brigadespage />} />
            <Route path="/fellowship" element={<FellowshipsPage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brigades/:id" element={<BrigadeDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
