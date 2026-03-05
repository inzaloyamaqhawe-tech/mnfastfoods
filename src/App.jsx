import { useMemo, useState } from 'react';
import containerLandmark from './assets/container-landmark.jpg';

const plates = [
  { id: 'wors-roll', name: 'Wors Roll', price: 45 },
  { id: 'pap-wors', name: 'Pap & Wors', price: 55 },
  { id: 'pap-beef', name: 'Pap & Beef', price: 75 },
  { id: 'pap-chicken-wors-salad', name: 'Pap with Chicken, Wors & Salads', price: 85 },
  { id: 'pap-beef-wors-salad', name: 'Pap with Beef, Wors & Salads', price: 90 },
  { id: 'five-wings', name: '5 Chicken Wings', price: 60 },
];

const platters = [
  { id: 'platter-2', name: 'Pap with Beef, Chicken, Wors & Salads (For 2)', price: 150 },
  { id: 'platter-3', name: 'Pap with Beef, Chicken, Wors & Salads (For 3)', price: 220 },
];

const menuItems = [...plates, ...platters];

const businessWhatsApp = 'https://wa.me/27671430117';
const ownerWhatsApp = 'https://wa.me/27606397923';
const facebookPage = 'https://www.facebook.com/share/17LDeu3fw4/';

export default function App() {
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqMessage, setInqMessage] = useState('');

  const cartItems = useMemo(
    () => menuItems.filter((item) => (cart[item.id] || 0) > 0).map((item) => ({ ...item, qty: cart[item.id] || 0 })),
    [cart]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const adjustQty = (id, delta) => {
    setCart((prev) => {
      const nextQty = Math.max(0, (prev[id] || 0) + delta);
      if (nextQty === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const orderWhatsAppLink = useMemo(() => {
    const itemLines =
      cartItems.length > 0
        ? cartItems.map((item) => `- ${item.name} x${item.qty} = R${item.price * item.qty}`).join('\n')
        : '- No items selected yet';

    const message = [
      'Hello Mnce Shisanyama, I want to place an order.',
      '',
      `Name: ${customerName || 'Not provided'}`,
      `Phone: ${customerPhone || 'Not provided'}`,
      '',
      'Order:',
      itemLines,
      '',
      `Total: R${total}`,
      `Notes: ${orderNotes || 'None'}`,
    ].join('\n');

    return `${businessWhatsApp}?text=${encodeURIComponent(message)}`;
  }, [cartItems, customerName, customerPhone, total, orderNotes]);

  const inquiryWhatsAppLink = useMemo(() => {
    const message = [
      'Hello Inzalo Yamaqhawe Technologies, I have a question.',
      '',
      `Name: ${inqName || 'Not provided'}`,
      `Phone: ${inqPhone || 'Not provided'}`,
      '',
      `Message: ${inqMessage || 'No message provided'}`,
    ].join('\n');

    return `${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
  }, [inqName, inqPhone, inqMessage]);

  return (
    <div className="site">
      <nav className="top-nav">
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#order">Order</a>
        <a href="#contact">Contact Us</a>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <p className="tag">Mnce Shisanyama Durban Maimai</p>
          <h1>M.N Fast FOODS</h1>
          <p className="intro">
            Flame-grilled shisanyama, hearty pap plates, and filling platters served fresh from our
            Durban Workshop container site.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#order">
              Start Your Order
            </a>
            <a className="btn secondary" href={facebookPage} target="_blank" rel="noreferrer">
              View Facebook Page
            </a>
          </div>
        </div>
        <div className="hero-landmark">
          <img src={containerLandmark} alt="Mnce Shisanyama container landmark at Durban Workshop" />
          <div className="hero-card">
            <h2>Visit Us</h2>
            <p>Durban Workshop, Maimai</p>
            <p>Container Site (Mnce Shisanyama) — landmark shown above</p>
            <a className="inline-link" href="tel:+27671430117">
              Call: +27 67 143 0117
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="menu-section" id="about">
          <h2>About Us</h2>
          <p>
            M.N Fast FOODS (Mnce Shisanyama) serves fresh, hearty shisanyama meals from our Durban Workshop
            container site in Maimai.
          </p>
          <p>
            We focus on affordable plates, family platters, and fast WhatsApp ordering for walk-in and pickup
            customers.
          </p>
        </section>

        <section className="menu-section" id="order">
          <h2>Plates</h2>
          <ul>
            {plates.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <div className="menu-actions">
                  <strong>{`R${item.price}`}</strong>
                  <button className="qty-btn" onClick={() => adjustQty(item.id, 1)} type="button">
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="menu-section">
          <h2>Platters</h2>
          <ul>
            {platters.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <div className="menu-actions">
                  <strong>{`R${item.price}`}</strong>
                  <button className="qty-btn" onClick={() => adjustQty(item.id, 1)} type="button">
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="menu-section cart-panel">
          <h2>Your Order</h2>
          {cartItems.length === 0 ? (
            <p>No items selected yet. Use Add on any menu item.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{`${item.name} x${item.qty}`}</span>
                  <div className="menu-actions">
                    <strong>{`R${item.price * item.qty}`}</strong>
                    <button className="qty-btn small" onClick={() => adjustQty(item.id, -1)} type="button">
                      -1
                    </button>
                    <button className="qty-btn small" onClick={() => adjustQty(item.id, 1)} type="button">
                      +1
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="total-line">Total: {`R${total}`}</p>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Your phone number"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
            />
            <textarea
              placeholder="Order notes (location, pickup time, extras)"
              rows={3}
              value={orderNotes}
              onChange={(event) => setOrderNotes(event.target.value)}
            />
          </div>

          <a className="btn tertiary full" href={orderWhatsAppLink} target="_blank" rel="noreferrer">
            Send Order to Mnce on WhatsApp
          </a>
        </section>

        <section className="photos-note" id="contact">
          <h3>Contact Us</h3>
          <p>
            For food orders: <a className="inline-link" href="tel:+27671430117">+27 67 143 0117</a>
          </p>
          <p>
            For website questions (Inzalo Yamaqhawe Technologies), send a direct WhatsApp message below.
          </p>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Your name"
              value={inqName}
              onChange={(event) => setInqName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Your phone number"
              value={inqPhone}
              onChange={(event) => setInqPhone(event.target.value)}
            />
            <textarea
              placeholder="Your question or message"
              rows={3}
              value={inqMessage}
              onChange={(event) => setInqMessage(event.target.value)}
            />
          </div>

          <a className="btn secondary" href={inquiryWhatsAppLink} target="_blank" rel="noreferrer">
            Send Question to Inzalo Yamaqhawe Technologies
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>
          Powered by:{' '}
          <a href={ownerWhatsApp} target="_blank" rel="noreferrer">
            INZALO YAMAQHAWE TECHNOLOGIES
          </a>
        </p>
      </footer>
    </div>
  );
}
