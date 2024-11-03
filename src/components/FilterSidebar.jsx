// FilterSidebar.js
import React from "react";
import { Collapse, Select, Slider, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

const FilterSidebar = ({
  uniqueCategories,
  uniqueBrands,
  filters,
  setFilters,
}) => {
  const items = [
    {
      key: "1",
      label: "Category",
      children: (
        <Select
          placeholder="Select Category"
          value={filters.category}
          onChange={(value) => setFilters({ category: value })}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {uniqueCategories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "2",
      label: "Brand",
      children: (
        <Select
          placeholder="Select Brand"
          value={filters.brand}
          onChange={(value) => setFilters({ brand: value })}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {uniqueBrands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "3",
      label: "Price Range",
      children: (
        <Slider
          range
          value={filters.priceRange}
          onChange={(value) => setFilters({ priceRange: value })}
          min={0}
          max={500}
          step={10}
          marks={{ 0: "$0", 500: "$500" }}
          style={{ marginBottom: 16 }}
        />
      ),
    },
    {
      key: "4",
      label: "Rating",
      children: (
        <Select
          placeholder="Select Rating"
          value={filters.rating}
          onChange={(value) => setFilters({ rating: value })}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {[1, 2, 3, 4, 5].map((rate) => (
            <Option key={rate} value={rate}>
              {rate} Star
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div className="filter-sidebar">
      <Title level={4}>Filters</Title>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </div>
  );
};

export default FilterSidebar;
