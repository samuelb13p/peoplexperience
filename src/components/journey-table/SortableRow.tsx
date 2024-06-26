import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
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
      <div className={`grid grid-cols-[250px_1fr] gap-4`}>
        <div
          className="bg-blue-200 relative flex items-center justify-center text-center border-solid border-2 rounded-md m-1 border-blue-200 py-4"
          key={columns[0]}
        >
          <div className="flex items-center justify-center">
            <span className="uppercase">{row[columns[0]]}</span>
          </div>
          <div className="absolute top-50 right-1">
            <button
              data-no-dnd="true"
              onClick={() => removeRow(row)}
              className="text-red-500 hover:text-red-700 pr-1 pb-0.5 ml-0 m-1"
            >
              <FontAwesomeIcon icon={faTrash} size="1x" />
            </button>
          </div>
        </div>
        <div className={`grid ${columnClasses[columns.length]}`}>
          {columns.slice(1).map((column, index) => (
            <div
              className="flex items-center justify-center text-center border-solid border-2 rounded-md m-1 border-slate-300 py-4"
              key={column}
            >
              <div className="flex items-center justify-center">
                <span className="capitalize">
                  {row[column] ?? (
                    <FontAwesomeIcon
                      icon={faSmile}
                      size="1x"
                      className="bg-transparent"
                    />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortableRow;
