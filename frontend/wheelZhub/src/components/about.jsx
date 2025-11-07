import React from "react";
import "./About.css";
import carrent1 from "./images/carrent1.jpg"; // replace with your own image

function About() {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <h1>About Chennai Travels</h1>
        <p>Trusted Car Rental Services in Chennai for Over a Decade</p>
      </header>

      {/* About Intro */}
      <section className="about-section">
        <div className="about-content">
          <img src={carrent1} alt="About Chennai Travels" />
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              Chennai Travels is a leading car rental company offering
              comfortable, safe, and affordable self-drive and chauffeur-driven
              cars across Tamil Nadu. We pride ourselves on delivering reliable
              travel experiences for tourists, families, and corporate clients.
            </p>
            <p>
              Our modern fleet includes everything from compact hatchbacks to
              luxurious sedans and SUVs — ensuring the perfect ride for every
              occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To make every journey in Chennai convenient, safe, and enjoyable by
          providing quality vehicles and professional service.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>Wide Vehicle Selection</h3>
            <p>
              Choose from a variety of cars and bikes suitable for local and
              outstation travel.
            </p>
          </div>
          <div className="why-card">
            <h3>Affordable Pricing</h3>
            <p>
              Transparent rates with no hidden costs — pay only for what you
              use.
            </p>
          </div>
          <div className="why-card">
            <h3>24/7 Customer Support</h3>
            <p>
              Our team is available round the clock to assist with bookings or
              queries.
            </p>
          </div>
          <div className="why-card">
            <h3>Experienced Drivers</h3>
            <p>
              Our professional chauffeurs ensure comfort, safety, and punctuality
              for every trip.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Book Your Ride?</h2>
        <p>Contact us today for the best car rental experience in Chennai.</p>
        <a href="tel:+919876543210" className="cta-btn">
          📞 Call +91 98765 43210
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Chennai Travels | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default About;