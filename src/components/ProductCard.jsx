import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="product-card" onClick={() => onQuickView && onQuickView(product)}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView && onQuickView(product);
          }}
        >
          Quick View
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★ {product.rating}</span>
          <span className="reviews">({product.reviewsCount})</span>
        </div>

        <div className="product-price-row">
          <div className="price-wrapper">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <button
          className={`add-to-cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
