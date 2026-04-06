import { useState } from "react";
import "./App.css";

function App() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Message Sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>Explore World</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Destinations</a>
          <a href="#">Packages</a>
          <a href="#">Gallery</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Discover Beautiful Places</h2>
        <p>Your journey begins here</p>
        <button>Book Now</button>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations">
        <h2>Popular Destinations</h2>

        <div className="grid">
          <div className="card">
            <img src="https://picsum.photos/300/200?1" />
            <h3>Paris</h3>
          </div>

          <div className="card">
            <img src="https://picsum.photos/300/200?2" />
            <h3>Maldives</h3>
          </div>

          <div className="card">
            <img src="https://picsum.photos/300/200?3" />
            <h3>Bali</h3>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages">
        <h2>Tour Packages</h2>

        <div className="grid">
          <div className="card">
            <h3>Beach Package</h3>
            <p>5 Days / 4 Nights</p>
            <button>View Details</button>
          </div>

          <div className="card">
            <h3>Adventure Package</h3>
            <p>7 Days / 6 Nights</p>
            <button>View Details</button>
          </div>

          <div className="card">
            <h3>Luxury Package</h3>
            <p>10 Days / 9 Nights</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <h2>Gallery</h2>

        <div className="grid">
          <img src="https://picsum.photos/300/200?4" />
          <img src="https://picsum.photos/300/200?5" />
          <img src="https://picsum.photos/300/200?6" />
          <img src="https://picsum.photos/300/200?7" />
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
      <section className="contact">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})}
          />

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Explore World Travel</p>
      </footer>
    </>
  );
}

export default App;