import containerLandmark from './assets/container-landmark.jpg';

const plates = [
  { name: 'Wors Roll', price: 'R45' },
  { name: 'Pap & Wors', price: 'R55' },
  { name: 'Pap & Beef', price: 'R75' },
  { name: 'Pap with Chicken, Wors & Salads', price: 'R85' },
  { name: 'Pap with Beef, Wors & Salads', price: 'R90' },
  { name: '5 Chicken Wings', price: 'R60' },
];

const platters = [
  { name: 'Pap with Beef, Chicken, Wors & Salads (For 2)', price: 'R150' },
  { name: 'Pap with Beef, Chicken, Wors & Salads (For 3)', price: 'R220' },
];

const businessWhatsApp = 'https://wa.me/27785550002';
const ownerWhatsApp = 'https://wa.me/27606397923';
const facebookPage = 'https://www.facebook.com/share/17LDeu3fw4/';

export default function App() {
  return (
    <div className="site">
      <header className="hero">
        <div className="hero-content">
          <p className="tag">Mnce Shisanyama Durban Maimai</p>
          <h1>M.N Fast FOODS</h1>
          <p className="intro">
            Flame-grilled shisanyama, hearty pap plates, and filling platters served fresh from our
            Durban Workshop container site.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href={businessWhatsApp} target="_blank" rel="noreferrer">
              Order on WhatsApp
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
            <a className="inline-link" href="tel:+27785550002">
              Call: +27 78 555 0002
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="menu-section">
          <h2>Plates</h2>
          <ul>
            {plates.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="menu-section">
          <h2>Platters</h2>
          <ul>
            {platters.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="photos-note">
          <h3>Food Gallery</h3>
          <p>
            More food photos are available on Facebook and online platforms. We can keep updating this
            page with new meal photos anytime.
          </p>
          <a className="btn tertiary" href={facebookPage} target="_blank" rel="noreferrer">
            See Latest Photos
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
