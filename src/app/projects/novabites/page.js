'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const menuCategories = [
  {
    title: '🥗 Starters',
    items: [
      { name: 'Bruschetta Classica', price: '$12', desc: 'Toasted artisan bread, diced heirloom tomatoes, garlic, basil, and extra virgin olive oil.' },
      { name: 'Carpaccio di Manzo', price: '$16', desc: 'Thinly sliced raw beef tenderloin, wild arugula, shaved Parmigiano-Reggiano.' },
      { name: 'Burrata & Tomatoes', price: '$14', desc: 'Creamy burrata, vine-ripened cherry tomatoes, balsamic reduction, basil pesto.' },
      { name: 'Calamari Fritti', price: '$13', desc: 'Crispy cornmeal-crusted squid with spicy marinara and lemon aioli.' }
    ]
  },
  {
    title: '🍝 Pasta & Mains',
    items: [
      { name: 'Truffle Mushroom Risotto', price: '$24', desc: 'Slow-cooked Arborio rice, wild porcini mushrooms, white truffle oil, shaved Parmesan.' },
      { name: 'Osso Buco Milanese', price: '$32', desc: 'Braised veal shanks in red wine with root vegetables, served over saffron risotto.' },
      { name: 'Lobster Linguine', price: '$28', desc: 'House-made linguine with Maine lobster, garlic, cherry tomatoes, white wine sauce.' },
      { name: 'Margherita Napoletana', price: '$18', desc: 'San Marzano tomato, fresh mozzarella di bufala, basil, olive oil on 48hr dough.' }
    ]
  },
  {
    title: '🍰 Desserts',
    items: [
      { name: 'Tiramisu Classico', price: '$11', desc: 'Espresso-soaked ladyfingers layered with rich whipped mascarpone cream and cocoa.' },
      { name: 'Panna Cotta', price: '$10', desc: 'Silky vanilla bean custard topped with sweet mixed berry compote and fresh mint.' },
      { name: 'Chocolate Fondant', price: '$13', desc: 'Warm chocolate cake with molten lava center, house-made vanilla bean gelato.' },
      { name: 'Affogato', price: '$9', desc: 'Fior di latte gelato drowned in a freshly pulled double shot of warm espresso.' }
    ]
  },
  {
    title: '🍷 Beverages',
    items: [
      { name: 'House Red Wine', price: '$12', desc: 'Curated Tuscan red wine, full-bodied with notes of dark berries and oak.' },
      { name: 'Craft Cocktails', price: '$15', desc: 'Signature mixes with fresh botanicals, house-infused syrups, and premium spirits.' },
      { name: 'Italian Espresso', price: '$5', desc: 'Classic single or double shot of rich, dark roasted Neapolitan coffee.' },
      { name: 'Fresh Limonata', price: '$7', desc: 'Sparkling lemon, freshly squeezed organic lemons, sweet cane syrup, mint.' }
    ]
  }
];

export default function NovaBites() {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', time: '', guests: '2' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', date: '', time: '', guests: '2' }); }, 4000);
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backBtn}>← Back to Portfolio</Link>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#" className={styles.logo}>NovaBites</a>
          <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
            <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
            <a href="#reservations" className={styles.navCta} onClick={() => setMobileOpen(false)}>Reserve a Table</a>
          </div>
        </div>
      </nav>

      <header className={styles.hero}>
        <Image src="/images/restaurant-hero.jpg" alt="NovaBites restaurant ambiance" fill className={styles.heroImage} priority />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>✦ Authentic Italian Cuisine Since 1998</div>
          <h1 className={styles.heroTitle}>
            Where Every Meal Becomes a <span className={styles.heroAccent}>Memory</span>
          </h1>
          <p className={styles.heroDesc}>
            Hand-crafted pasta, wood-fired pizzas, and curated wines in a warm, candlelit setting that feels like family.
          </p>
          <div className={styles.heroBtns}>
            <a href="#reservations" className={styles.btnPrimary}>Reserve a Table</a>
            <a href="#menu" className={styles.btnSecondary}>View Our Menu</a>
          </div>
        </div>
      </header>

      <div className={styles.introStrip}>
        <div className={styles.introInner}>
          <h2>A Taste of Naples, Right at Your Table</h2>
          <p>Every ingredient is sourced locally, every recipe passed down through three generations of the Romano family. We don&apos;t just serve food — we create experiences.</p>
        </div>
      </div>

      <section id="menu" className={styles.menu}>
        <div className={styles.menuInner}>
          <div className={styles.sectionLabel}>Our Menu</div>
          <h2 className={styles.sectionTitle}>Curated With Love</h2>
          <div className={styles.menuGrid}>
            {menuCategories.map((category, index) => (
              <div key={index} className={styles.menuCategory}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                {category.items.map((item, idx) => (
                  <div key={idx} className={styles.menuItem}>
                    <div className={styles.menuItemHeader}>
                      <span className={styles.menuItemName}>{item.name}</span>
                      <span className={styles.menuItemPrice}>{item.price}</span>
                    </div>
                    <p className={styles.menuItemDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.foodBanner}>
        <Image src="/images/restaurant-food.jpg" alt="Fresh Italian cuisine" fill style={{ objectFit: 'cover' }} />
        <div className={styles.foodBannerOverlay}>
          <div className={styles.foodBannerText}>Fresh Ingredients. Timeless Recipes. Made Daily.</div>
        </div>
      </div>

      <section id="about" className={styles.about}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <div className={styles.sectionLabel}>Our Story</div>
            <h3>A Family Tradition Since 1998</h3>
            <p>
              Started by Chef Mario Romano and his family, NovaBites brings the warm hospitality and authentic flavors of Naples to your table. We believe in using the freshest ingredients, time-tested recipes, and an abundance of love in everything we serve.
            </p>
            <p>
              From our 48-hour slow-rise pizza dough to our daily handmade pasta sheets, every dish is crafted from scratch right here in our open kitchen.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🌱</span>
                <span className={styles.featureText}>Farm-to-table organic ingredients</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>👨‍🍳</span>
                <span className={styles.featureText}>Award-winning Neapolitan chef</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🍷</span>
                <span className={styles.featureText}>Private wine cellar, 200+ labels</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎵</span>
                <span className={styles.featureText}>Live jazz music every Friday</span>
              </div>
            </div>
          </div>
          <div className={styles.aboutImage}>
            <Image src="/images/restaurant-hero.jpg" alt="NovaBites interior" width={600} height={450} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      <section id="reservations" className={styles.reservation}>
        <div className={styles.reservationInner}>
          <div className={styles.sectionLabel}>Reservations</div>
          <h2 className={styles.sectionTitle}>Book Your Table</h2>
          <p style={{ marginBottom: '8px' }}>Join us for an unforgettable evening. Fill out the form below to reserve.</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Your Name</label>
              <input type="text" className={styles.formInput} placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" className={styles.formInput} placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input type="date" className={styles.formInput} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>Time</label>
                <input type="time" className={styles.formInput} value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Number of Guests</label>
              <select className={styles.formInput} value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (<option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>))}
              </select>
            </div>
            <button type="submit" className={styles.formSubmit}>
              {submitted ? '✓ Reservation Confirmed!' : 'Reserve Now →'}
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 NovaBites. Crafted with <span className={styles.heart}>♥</span> in the heart of the city.</p>
      </footer>
    </div>
  );
}
