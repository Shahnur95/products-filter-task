// ProductTable.js
import React from "react";
import { Table } from "antd";

const ProductTable = ({ filteredProducts, loading }) => {
  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text.toFixed(2)}`,
    },
    { title: "Rating", dataIndex: "rating", key: "rating" },
  ];

  return (
    <Table
      dataSource={filteredProducts}
      columns={columns}
      rowKey="id"
      loading={loading}
      locale={{ emptyText: "No products found!" }}
    />
  );
};

export default ProductTable;
