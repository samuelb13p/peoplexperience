import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface SortableColumnProps {
  id: string;
  column: string;
  isFirstColumn: boolean;
  removeColumn: (column: string) => void;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  id,
  column,
  isFirstColumn,
  removeColumn,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFirstColumn ? "default" : "grab",
  };

  return (
    <div
      className="bg-blue-200 relative flex items-center justify-center text-center border-solid border-2 rounded-md m-1 border-blue-200 py-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isFirstColumn ? {} : listeners)}
    >
      <p className={`uppercase ${!isFirstColumn && "pr-5"}`}>{column}</p>
      {!isFirstColumn && (
        <div className="absolute top-50 right-1">
          <button
            data-no-dnd="true"
            className="text-red-500 hover:text-red-700  pr-1 pb-0.5 ml-0 m-1"
            onClick={() => removeColumn(column)}
          >
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SortableColumn;
