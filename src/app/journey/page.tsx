"use client";

import Header from "@/components/Header";
import SortableTable from "@/components/journey-table/SortableTable";

export default function Journey() {
  const initialRows = [
    { stage: "Image", id: "1", delivery: "Samuel", products: 23 },
    { stage: "Oportunities", id: "2", delivery: "Jacob", products: 26 },
    { stage: "Customer", id: "3", delivery: "Antonio", products: 76 },
    { stage: "Emotional", id: "4", delivery: "Frijol", products: 76 },
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
    </div>
  );
}
