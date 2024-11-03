import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Layout, Row, Col, Button } from "antd";
import { mockData } from "../mock-data/mock-data";
import FilterSidebar from "./FilterSidebar";
import ProductTable from "./ProductTable";

const { Content } = Layout;

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(() => {
    const savedFilters = JSON.parse(localStorage.getItem("productFilters"));
    return {
      category: savedFilters ? savedFilters.category : null,
      brand: savedFilters ? savedFilters.brand : null,
      priceRange: savedFilters ? savedFilters.priceRange : [0, 500],
      rating: savedFilters ? savedFilters.rating : null,
    };
  });

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockData;
    };

    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  }, []);

  const clearFilters = () => {
    const defaultFilters = {
      category: null,
      brand: null,
      priceRange: [0, 500],
      rating: null,
    };
    setFilters(defaultFilters);
  };

  const uniqueCategories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const uniqueBrands = useMemo(
    () => [...new Set(products.map((product) => product.brand))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (loading) return [];

    let filtered = products;
    const { category, brand, priceRange, rating } = filters;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    if (rating) {
      filtered = filtered.filter((product) => product.rating >= rating);
    }

    return filtered;
  }, [filters, products, loading]);

  useEffect(() => {
    localStorage.setItem("productFilters", JSON.stringify(filters));
  }, [filters]);

  return (
    <Layout>
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <FilterSidebar
            uniqueCategories={uniqueCategories}
            uniqueBrands={uniqueBrands}
            filters={filters}
            setFilters={handleFilterChange}
          />
        </Col>
        <Col xs={24} md={18}>
          <Content style={{ padding: "0 24px" }}>
            <h1>Product List</h1>
            <Button
              type="primary"
              onClick={clearFilters}
              style={{ marginBottom: 16 }}
            >
              Clear All Filters
            </Button>
            <ProductTable
              filteredProducts={filteredProducts}
              loading={loading}
            />
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};
