// Product.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => (
  <Card sx={{ maxWidth: 400, margin: 10 }}>
    <CardMedia
      component="img"
      height="200" // Increased the height
      image={product.product_photo}
      alt={product.product_title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product.product_title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.product_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`Rated ${product.product_star_rating}/5`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a href={product.product_url} target="_blank" rel="noopener noreferrer">
          Buy now
        </a>
      </Typography>
    </CardContent>
  </Card>
);

const Product = ({ productData }) => (
  <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '10px' }}>
    {productData.map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </div>
);

export default Product;
