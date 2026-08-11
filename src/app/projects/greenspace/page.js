'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const listings = [
  {
    id: 1, price: '$1,250,000', name: 'Modern Villa with Ocean View', location: 'Malibu, California',
    beds: '4', baths: '3', size: '3,200', badgeText: 'For Sale', badgeClass: styles.badgeSale,
    image: '/images/realestate-hero.jpg'
  },
  {
    id: 2, price: '$850,000', name: 'Downtown Luxury Penthouse', location: 'Manhattan, New York',
    beds: '3', baths: '2', size: '2,100', badgeText: 'New', badgeClass: styles.badgeNew,
    image: '/images/property-2.jpg'
  },
  {
    id: 3, price: '$2,400/mo', name: 'Waterfront Studio Apartment', location: 'Miami Beach, Florida',
    beds: '1', baths: '1', size: '750', badgeText: 'Hot', badgeClass: styles.badgeHot,
    image: '/images/property-1.jpg'
  },
  {
    id: 4, price: '$675,000', name: 'Suburban Family Home', location: 'Austin, Texas',
    beds: '5', baths: '3', size: '4,100', badgeText: 'For Sale', badgeClass: styles.badgeSale,
    image: '/images/realestate-hero.jpg'
  },
  {
    id: 5, price: '$1,800/mo', name: 'Cozy Mountain Cabin', location: 'Aspen, Colorado',
    beds: '2', baths: '2', size: '1,400', badgeText: 'New', badgeClass: styles.badgeNew,
    image: '/images/property-3.jpg'
  },
  {
    id: 6, price: '$920,000', name: 'Lakeside Contemporary Home', location: 'Lake Tahoe, Nevada',
    beds: '4', baths: '3', size: '3,600', badgeText: 'Hot', badgeClass: styles.badgeHot,
    image: '/images/property-1.jpg'
  }
];

export default function GreenSpace() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Buy');

  const filteredListings = listings.filter((prop) => {
    const matchesSearch =
      search.trim() === '' ||
      prop.name.toLowerCase().includes(search.toLowerCase()) ||
      prop.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      type === 'Any' ||
      (type === 'Buy' && !prop.price.includes('/mo')) ||
      (type === 'Rent' && prop.price.includes('/mo'));

    return matchesSearch && matchesType;
  });

  const handleNavScroll = (sectionId, filterType = null) => {
    if (filterType) {
      setType(filterType);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backBtn}>← Back to Portfolio</Link>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>Green<span className={styles.logoAccent}>Space</span></div>
          <div className={styles.navLinks}>
            <button onClick={() => handleNavScroll('listings', 'Buy')} className={styles.navLinkBtn}>Buy</button>
            <button onClick={() => handleNavScroll('listings', 'Rent')} className={styles.navLinkBtn}>Rent</button>
            <a href="#listings" className={styles.navLink}>Sell</a>
            <a href="#listings" className={styles.navLink}>About</a>
            <a href="#cta" className={styles.navCta}>List Property</a>
          </div>
        </div>
      </nav>

      <header className={styles.hero}>
        <Image src="/images/realestate-hero.jpg" alt="Luxury modern home" fill className={styles.heroImage} priority />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>🏡 Find Your Dream Home</div>
          <h1 className={styles.heroTitle}>
            Discover Your Perfect <span className={styles.heroAccent}>Living Space</span>
          </h1>
          <p className={styles.heroDesc}>
            Browse thousands of premium residential properties, luxury condos, and vacation homes handpicked for you.
          </p>
          <div className={styles.searchBar}>
            <div className={styles.searchInner}>
              <input
                type="text" placeholder="Search by city, neighborhood, or zip code..."
                className={styles.searchInput} value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className={styles.searchSelect} value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
                <option value="Any">Any</option>
              </select>
              <button type="button" className={styles.searchBtn} onClick={() => handleNavScroll('listings')}>🔍 Search</button>
            </div>
          </div>
        </div>
      </header>

      <section id="listings" className={styles.listings}>
        <div className={styles.listingsInner}>
          <div className={styles.sectionLabel}>Featured Properties</div>
          <h2 className={styles.sectionTitle}>Premium Listings</h2>
          <p className={styles.sectionSubtitle}>Handpicked properties designed to meet your highest lifestyle expectations</p>
          <div className={styles.listingsGrid}>
            {filteredListings.map((prop) => (
              <div key={prop.id} className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <span className={`${styles.propertyBadge} ${prop.badgeClass}`}>{prop.badgeText}</span>
                  <Image src={prop.image} alt={prop.name} width={400} height={200} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div className={styles.propertyInfo}>
                  <span className={styles.propertyPrice}>{prop.price}</span>
                  <h3 className={styles.propertyName}>{prop.name}</h3>
                  <div className={styles.propertyLocation}><span>📍</span> {prop.location}</div>
                  <div className={styles.propertyMeta}>
                    <div className={styles.metaItem}><span>🛏</span> {prop.beds} Beds</div>
                    <div className={styles.metaItem}><span>🛁</span> {prop.baths} Baths</div>
                    <div className={styles.metaItem}><span>📐</span> {prop.size} sqft</div>
                  </div>
                </div>
              </div>
            ))}
            {filteredListings.length === 0 && (
              <div className={styles.emptyState}>
                <h3>No Properties Found</h3>
                <p>No listings match your search keywords or categories. Try clearing your filters.</p>
                <button type="button" onClick={() => { setSearch(''); setType('Any'); }}>Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>2,500+</div>
            <div className={styles.statLabel}>Properties Listed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1,200+</div>
            <div className={styles.statLabel}>Happy Families</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Satisfaction Rate</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Cities Covered</div>
          </div>
        </div>
      </section>

      <section id="cta" className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.sectionLabel}>Get Started</div>
          <h2 className={styles.sectionTitle}>Ready to Find Your Home?</h2>
          <p className={styles.ctaDesc}>
            Whether you&apos;re buying your first home, selling a property, or looking for a rental — our team of dedicated agents is here every step of the way.
          </p>
          <div className={styles.ctaBtns}>
            <button className={styles.btnPrimary} onClick={() => { setSearch(''); setType('Any'); handleNavScroll('listings'); }}>Browse All Properties</button>
            <button className={styles.btnSecondary} onClick={() => alert('Our real estate agent support line is active! We have sent details to your registered profile.')}>Contact an Agent</button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 GreenSpace Real Estate. All rights reserved.</p>
      </footer>
    </div>
  );
}
