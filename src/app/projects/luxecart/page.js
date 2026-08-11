'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const products = [
  { id: 1, name: 'Velvet Evening Clutch', category: 'Accessories', price: 189, oldPrice: 249, image: '/images/product-clutch.jpg', desc: 'Handcrafted plush velvet clutch bag with polished gold-tone hardware and a detachable chain shoulder strap. Perfect for formal evenings.', tags: ['New Arrivals', 'Sale'] },
  { id: 2, name: 'Chronograph Gold Edition', category: 'Watches', price: 2450, oldPrice: null, image: '/images/product-watch.jpg', desc: 'Precision mechanical chronograph with 18k yellow gold casing, black alligator leather strap, and a scratch-resistant sapphire crystal dial.', tags: ['Collections'] },
  { id: 3, name: 'Sapphire Pendant Necklace', category: 'Jewelry', price: 1890, oldPrice: 2200, image: '/images/product-necklace.jpg', desc: 'A brilliant 3-carat oval Ceylon sapphire set in an intricate 18k white gold pendant frame, accented by hand-set pavé diamonds.', tags: ['New Arrivals', 'Sale'] },
  { id: 4, name: 'Milano Leather Tote', category: 'Handbags', price: 845, oldPrice: null, image: '/images/product-tote.jpg', desc: 'Structured top-handle tote bag in grain-textured Italian calf leather. Features dual main compartments and protective metal feet.', tags: ['Collections'] },
  { id: 5, name: 'Midnight Noir Parfum', category: 'Fragrances', price: 320, oldPrice: 380, image: '/images/product-parfum.jpg', desc: 'An enigmatic fragrance blend of dark patchouli, sweet amber, black pepper, and premium Turkish rose. High concentration extrait de parfum.', tags: ['New Arrivals', 'Sale'] },
  { id: 6, name: 'Aviator Titanium Frames', category: 'Eyewear', price: 560, oldPrice: null, image: '/images/product-sunglasses.jpg', desc: 'Ultra-lightweight aerospace titanium aviator sunglasses with high-performance polarized lenses and anti-reflective coating.', tags: ['Collections'] }
];

export default function LuxeCart() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  const [selectedColor, setSelectedColor] = useState('Gold');
  const [selectedSize, setSelectedSize] = useState('Standard');

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.tags.includes(selectedCategory));
  }, [selectedCategory]);

  const addToCart = (product, color = 'Gold', size = 'Standard') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id && item.color === color && item.size === size);
      if (existingItem) {
        return prevCart.map(item => 
          (item.product.id === product.id && item.color === color && item.size === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1, color, size }];
    });
    setShowCart(true);
  };

  const updateQuantity = (productId, color, size, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.product.id === productId && item.color === color && item.size === size) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId, color, size) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.product.id === productId && item.color === color && item.size === size)
    ));
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);
  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 200 ? 0 : 25;
  }, [subtotal]);
  const tax = useMemo(() => Math.round(subtotal * 0.08 * 100) / 100, [subtotal]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setCart([]);
    }, 2000);
  };

  const handleQuickView = (product) => {
    setSelectedColor('Gold');
    setSelectedSize('Standard');
    setQuickViewProduct(product);
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backBtn}>← Back to Portfolio</Link>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>LUXE<span className={styles.logoAccent}>CART</span></div>
          <div className={styles.navLinks}>
            {['All', 'New Arrivals', 'Collections', 'Sale'].map((cat) => (
              <button 
                key={cat} 
                className={`${styles.navLink} ${selectedCategory === cat ? styles.navLinkActive : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cat}
              </button>
            ))}
            <button className={styles.cartBtn} onClick={() => setShowCart(true)}>
              <span className={styles.cartIcon}>🛒</span>
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </button>
          </div>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>✦ Limited Release 2026</div>
          <h1 className={styles.heroTitle}>
            Discover <span className={styles.heroAccent}>Luxury</span> Redefined
          </h1>
          <p className={styles.heroDesc}>
            Curated collection of high-end accessories, premium timepieces, and rare fragrances designed to make an impact.
          </p>
          <button className={styles.heroCta} onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop Collection &rarr;
          </button>
          <div className={styles.heroImageWrap}>
            <Image src="/images/ecommerce-hero.jpg" alt="Luxury product display" width={950} height={500} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} priority />
          </div>
        </div>
      </header>

      <section id="products" className={styles.products}>
        <div className={styles.productsInner}>
          <div className={styles.sectionLabel}>The Catalog</div>
          <h2 className={styles.sectionTitle}>Curated For You</h2>
          
          <div className={styles.catalogFilters}>
            {['All', 'New Arrivals', 'Collections', 'Sale'].map((cat) => (
              <button 
                key={cat} 
                className={`${styles.filterTab} ${selectedCategory === cat ? styles.filterTabActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage} onClick={() => handleQuickView(product)}>
                  <Image src={product.image} alt={product.name} width={400} height={260} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  <div className={styles.imageOverlay}><span>Quick View</span></div>
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.cardHeaderRow}>
                    <span className={styles.productCategory}>{product.category}</span>
                    {product.oldPrice && <span className={styles.saleBadge}>SALE</span>}
                  </div>
                  <h3 className={styles.productName} onClick={() => handleQuickView(product)}>{product.name}</h3>
                  <div className={styles.productPriceRow}>
                    <span className={styles.productPrice}>${product.price}</span>
                    {product.oldPrice && (
                      <span className={styles.productPriceOld}>${product.oldPrice}</span>
                    )}
                  </div>
                  <button className={styles.addToCart} onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <h3 className={styles.featureTitle}>Free Shipping</h3>
            <p className={styles.featureDesc}>Complimentary global shipping on orders over $200.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 className={styles.featureTitle}>Secure Payment</h3>
            <p className={styles.featureDesc}>256-bit bank-grade encryption for all checkouts.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </div>
            <h3 className={styles.featureTitle}>Easy Returns</h3>
            <p className={styles.featureDesc}>30 days of hassle-free exchange and return privileges.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3 className={styles.featureTitle}>Premium Quality</h3>
            <p className={styles.featureDesc}>Handcrafted goods certified for authentic lineage.</p>
          </div>
        </div>
      </section>

      <section id="newsletter" className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.sectionLabel}>Stay Updated</div>
          <h2 className={styles.sectionTitle}>Join Our Inner Circle</h2>
          <p style={{ color: '#86868B', marginTop: '-24px', fontSize: '0.95rem' }}>
            Be the first to receive updates on exclusive collections and private events.
          </p>
          {subscribed ? (
            <div className={styles.subscribeSuccess}>
              <h3>✓ Subscription Successful</h3>
              <p>Welcome. You will receive private access credentials shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
              setTimeout(() => {
                setSubscribed(false);
                setEmail('');
              }, 4000);
            }} className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.newsletterInput} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {showCart && (
        <div className={styles.cartDrawer}>
          <div className={styles.cartDrawerHeader}>
            <span>Shopping Cart ({totalItems})</span>
            <button className={styles.cartClose} onClick={() => setShowCart(false)}>✕</button>
          </div>
          <div className={styles.cartDrawerBody}>
            {cart.length === 0 ? (
              <div className={styles.emptyCartMsg}>
                <span className={styles.emptyCartIcon}>🛍️</span>
                <p>Your shopping cart is currently empty.</p>
                <button className={styles.cartCta} onClick={() => setShowCart(false)}>Browse Catalog</button>
              </div>
            ) : (
              <div className={styles.cartItemsList}>
                {cart.map((item, idx) => (
                  <div key={idx} className={styles.cartItemRow}>
                    <div className={styles.cartItemThumb}>
                      <Image src={item.product.image} alt={item.product.name} width={70} height={46} style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.cartItemDetails}>
                      <h4 className={styles.cartItemName}>{item.product.name}</h4>
                      <p className={styles.cartItemSpecs}>{item.color} / {item.size}</p>
                      <div className={styles.cartItemQtyRow}>
                        <div className={styles.qtyControl}>
                          <button onClick={() => updateQuantity(item.product.id, item.color, item.size, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.color, item.size, 1)}>+</button>
                        </div>
                        <span className={styles.cartItemPrice}>${item.product.price * item.quantity}</span>
                      </div>
                    </div>
                    <button className={styles.cartItemRemove} onClick={() => removeFromCart(item.product.id, item.color, item.size)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className={styles.cartDrawerFooter}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (8%)</span>
                <span>${tax}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Processing Transaction...' : `Secure Checkout • $${total}`}
              </button>
            </div>
          )}
        </div>
      )}

      {quickViewProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className={styles.modalBody}>
              <div className={styles.modalImageCol}>
                <Image src={quickViewProduct.image} alt={quickViewProduct.name} width={500} height={380} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div className={styles.modalInfoCol}>
                <span className={styles.productCategory}>{quickViewProduct.category}</span>
                <h2 className={styles.modalTitle}>{quickViewProduct.name}</h2>
                <div className={styles.modalPrice}>
                  <span>${quickViewProduct.price}</span>
                  {quickViewProduct.oldPrice && <span className={styles.modalOldPrice}>${quickViewProduct.oldPrice}</span>}
                </div>
                <p className={styles.modalDesc}>{quickViewProduct.desc}</p>
                
                <div className={styles.modalOptionGroup}>
                  <label>Select Metal / Color</label>
                  <div className={styles.optionRow}>
                    {['Gold', 'Silver', 'Rose Gold'].map(col => (
                      <button 
                        key={col} 
                        className={`${styles.optionBtn} ${selectedColor === col ? styles.optionBtnActive : ''}`}
                        onClick={() => setSelectedColor(col)}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.modalOptionGroup}>
                  <label>Select Edition / Size</label>
                  <div className={styles.optionRow}>
                    {['Standard', 'Signature Signature', 'Bespoke Private'].map(sz => (
                      <button 
                        key={sz} 
                        className={`${styles.optionBtn} ${selectedSize === sz ? styles.optionBtnActive : ''}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className={styles.modalAddToCart} 
                  onClick={() => {
                    addToCart(quickViewProduct, selectedColor, selectedSize);
                    setQuickViewProduct(null);
                  }}
                >
                  Confirm Choice &amp; Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {checkoutSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIcon}>✓</div>
            <h2>Transaction Successful</h2>
            <p>Your premium transaction has been processed securely. An invoice and tracking credentials have been generated and dispatched to your email.</p>
            <button className={styles.successCloseBtn} onClick={() => setCheckoutSuccess(false)}>Continue Browsing</button>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>© 2026 LuxeCart Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}
