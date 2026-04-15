import { useState, useEffect } from "react";
import "./App.css";

interface TravelPackage {
  id: number;
  name: string;
  duration: string;
  price: number;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface Booking {
  id: number;
  userName: string;
  packageName: string;
  date: string;
}

interface BookingForm {
  userName: string;
  packageName: string;
  date: string;
}

interface NewPackageForm {
  name: string;
  duration: string;
  price: string;
}

const API_URL = "http://localhost:8080/api";

function App() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: ""
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    userName: "",
    packageName: "",
    date: ""
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackageForm, setNewPackageForm] = useState<NewPackageForm>({
    name: "",
    duration: "",
    price: ""
  });
  const [addPackageSubmitting, setAddPackageSubmitting] = useState(false);
  const [addPackageError, setAddPackageError] = useState<string | null>(null);
  const [addPackageSuccess, setAddPackageSuccess] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchBookings();
  }, []);

  const fetchPackages = () => {
    fetch(`${API_URL}/packages`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch packages");
        return res.json();
      })
      .then((data) => {
        setPackages(data);
        setPackagesLoading(false);
      })
      .catch((err) => {
        setPackagesError(err.message);
        setPackagesLoading(false);
      });
  };

  const fetchBookings = () => {
    fetch(`${API_URL}/bookings`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setBookingsLoading(false);
      })
      .catch((err) => {
        setBookingsError(err.message);
        setBookingsLoading(false);
      });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError(null);
    setContactSuccess(false);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (!res.ok) throw new Error("Failed to send message");
      setContactSuccess(true);
      setContactForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setContactError(message);
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleBookPackage = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setBookingForm({ userName: "", packageName: pkg.name, date: "" });
    setShowBookingModal(true);
    setBookingError(null);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitting(true);
    setBookingError(null);
    setBookingSuccess(false);

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm)
      });
      if (!res.ok) throw new Error("Failed to create booking");
      setBookingSuccess(true);
      setShowBookingModal(false);
      fetchBookings();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setBookingError(message);
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      fetchBookings();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddPackageSubmitting(true);
    setAddPackageError(null);
    setAddPackageSuccess(false);

    try {
      const payload = {
        name: newPackageForm.name,
        duration: newPackageForm.duration,
        price: parseFloat(newPackageForm.price)
      };
      const res = await fetch(`${API_URL}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to add package");
      setAddPackageSuccess(true);
      setNewPackageForm({ name: "", duration: "", price: "" });
      fetchPackages();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setAddPackageError(message);
    } finally {
      setAddPackageSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>Explore World</h1>
        <nav>
          <a href="#hero">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#packages">Packages</a>
          <a href="#bookings">My Bookings</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <h2>Discover Beautiful Places</h2>
        <p>Your journey begins here</p>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations" id="destinations">
        <h2>Popular Destinations</h2>
        <div className="grid">
          <div className="card">
            <img src="https://picsum.photos/300/200?1" alt="Paris" />
            <h3>Paris</h3>
          </div>
          <div className="card">
            <img src="https://picsum.photos/300/200?2" alt="Maldives" />
            <h3>Maldives</h3>
          </div>
          <div className="card">
            <img src="https://picsum.photos/300/200?3" alt="Bali" />
            <h3>Bali</h3>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages" id="packages">
        <h2>Tour Packages</h2>
        <button className="add-package-btn" onClick={() => { setShowAddPackage(!showAddPackage); setAddPackageError(null); setAddPackageSuccess(false); }}>
          {showAddPackage ? "Cancel" : "+ Add Package"}
        </button>

        {showAddPackage && (
          <div className="add-package-form-container">
            <h3>Add New Package</h3>
            {addPackageError && <p className="error">{addPackageError}</p>}
            {addPackageSuccess && <p className="success">Package added successfully!</p>}
            <form onSubmit={handleAddPackage}>
              <input
                type="text"
                placeholder="Package Name"
                value={newPackageForm.name}
                onChange={(e) => setNewPackageForm({ ...newPackageForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g. 5 Days / 4 Nights)"
                value={newPackageForm.duration}
                onChange={(e) => setNewPackageForm({ ...newPackageForm, duration: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price (e.g. 1299.99)"
                value={newPackageForm.price}
                onChange={(e) => setNewPackageForm({ ...newPackageForm, price: e.target.value })}
                required
              />
              <button type="submit" disabled={addPackageSubmitting}>
                {addPackageSubmitting ? "Adding..." : "Add Package"}
              </button>
            </form>
          </div>
        )}

        {packagesLoading && <p>Loading packages...</p>}
        {packagesError && <p className="error">Error: {packagesError}</p>}
        {!packagesLoading && !packagesError && packages.length === 0 && (
          <p>No packages available. Click "+ Add Package" to add one!</p>
        )}
        <div className="grid">
          {packages.map((pkg) => (
            <div className="card" key={pkg.id}>
              <h3>{pkg.name}</h3>
              <p>{pkg.duration}</p>
              <p className="price">${pkg.price.toFixed(2)}</p>
              <button onClick={() => handleBookPackage(pkg)}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKINGS */}
      <section className="bookings" id="bookings">
        <h2>My Bookings</h2>
        {bookingsLoading && <p>Loading bookings...</p>}
        {bookingsError && <p className="error">Error: {bookingsError}</p>}
        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <p>No bookings yet. Browse packages and book one!</p>
        )}
        <div className="bookings-list">
          {bookings.map((b) => (
            <div className="booking-card" key={b.id}>
              <div className="booking-info">
                <h3>{b.packageName}</h3>
                <p><strong>Booked by:</strong> {b.userName}</p>
                <p><strong>Travel Date:</strong> {b.date}</p>
              </div>
              <button className="cancel-btn" onClick={() => handleDeleteBooking(b.id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <h2>Gallery</h2>
        <div className="grid">
          <img src="https://picsum.photos/300/200?4" alt="Gallery 1" />
          <img src="https://picsum.photos/300/200?5" alt="Gallery 2" />
          <img src="https://picsum.photos/300/200?6" alt="Gallery 3" />
          <img src="https://picsum.photos/300/200?7" alt="Gallery 4" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Travelers Say</h2>
        <div className="grid">
          <div className="review">
            <p>"Amazing experience! Highly recommended."</p>
            <h4>- Sarah</h4>
          </div>
          <div className="review">
            <p>"Best travel service I have ever used."</p>
            <h4>- John</h4>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        {contactError && <p className="error">{contactError}</p>}
        {contactSuccess && <p className="success">Message sent successfully!</p>}
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            required
          />
          <button type="submit" disabled={contactSubmitting}>
            {contactSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* BOOKING MODAL */}
      {showBookingModal && selectedPackage && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Book {selectedPackage.name}</h2>
            {bookingError && <p className="error">{bookingError}</p>}
            {bookingSuccess && <p className="success">Booking created successfully!</p>}
            <form onSubmit={handleBookingSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={bookingForm.userName}
                onChange={(e) => setBookingForm({ ...bookingForm, userName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Package Name"
                value={bookingForm.packageName}
                readOnly
              />
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={bookingSubmitting}>
                  {bookingSubmitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Explore World Travel</p>
      </footer>
    </>
  );
}

export default App;
