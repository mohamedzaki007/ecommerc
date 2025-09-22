import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="prose lg:prose-xl max-w-4xl mx-auto">
        <p>
          Welcome to our store! We are passionate about providing high-quality products and an exceptional shopping experience. Our journey began with a simple idea: to create a one-stop shop for all your needs, offering a curated selection of items that we love and believe in.
        </p>
        <p>
          Our team is made up of dedicated professionals who are committed to sourcing the best products, ensuring customer satisfaction, and building a community around our brand. We believe in the power of great design, quality craftsmanship, and sustainable practices.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to inspire and delight our customers with every interaction. We aim to offer a diverse range of products that cater to different tastes and lifestyles, all while maintaining our commitment to quality and value. We strive to be a brand that you can trust and rely on.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
        <ul>
          <li><strong>Customer First:</strong> Your satisfaction is our top priority.</li>
          <li><strong>Quality Obsessed:</strong> We never compromise on the quality of our products.</li>
          <li><strong>Integrity:</strong> We believe in being honest and transparent in everything we do.</li>
          <li><strong>Innovation:</strong> We are always looking for new and better ways to serve you.</li>
        </ul>
        <p>
          Thank you for choosing to shop with us. We are excited to have you as part of our community and look forward to serving you.
        </p>
      </div>
    </div>
  );
}
