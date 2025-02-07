import React from "react";
import "./BrandsShowcase.css";

const brands = [
    { name: "Adidas", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" },
    { name: "Columbia", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" },
    { name: "Under Armour", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" },
    { name: "Samsung", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" },
    { name: "Xiaomi", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" },
    { name: "Apple", logo: "https://images.seeklogo.com/logo-png/16/2/adidas-logo-png_seeklogo-168370.png" }
];

const BrandsShowcase = () => {
    return (
            <div className="brand-container">
                {brands.map((brand, index) => (
                    <div className="brand-item" key={index}>
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
            </div>
    );
};

export default BrandsShowcase;