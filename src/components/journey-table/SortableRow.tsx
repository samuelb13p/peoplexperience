import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row } from "@/schemas/types";

interface SortableRowProps {
  id: string;
  columns: string[];
  row: Row;
  removeRow: (row: Row) => void;
}

const SortableRow: React.FC<SortableRowProps> = ({
  id,
  columns,
  row,
  removeRow,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  /* Pendig to improve */
  const columnClasses: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <div className={`grid grid-cols-4`}> */}
      <div className={`grid ${columnClasses[columns.length]}`}>
        {columns.map((column, index) => (
          <div
            className="text-center border-solid border-2 rounded-lg m-1 border-slate-600 py-4"
            key={column}
          >
            {index === 0 ? (
              <div className="flex">

                <div className="flex justify-center align-center">

                <p className="uppercase">{row[column]}</p>
                </div>
                <button
                  data-no-dnd="true"
                  onClick={() => removeRow(row)}
                  className="bg-red-200 p-1 rounded-lg m-1"
                >
                  <FontAwesomeIcon icon={faTrash} size="1x" />
                </button>
              </div>
            ) : (
              <div>{row[column]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortableRow;
