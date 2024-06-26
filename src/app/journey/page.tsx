"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SortableTable from "@/components/journey-table/SortableTable";

export default function Journey() {
  const initialRows = [
    { stage: "Image", id: "1", delivery: "Samuel", products: 50 },
    { stage: "Oportunities", id: "2", delivery: "Douglas", products: 35 },
  ];

  const initialColumns = ["stage", "delivery", "products"];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 text-black">
        <SortableTable
          initialRows={initialRows}
          initialColumns={initialColumns}
        />
      </div>
      <Footer />
    </div>
  );
}
