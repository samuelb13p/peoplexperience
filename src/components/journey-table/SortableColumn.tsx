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
      className="text-center border-solid border-2 rounded-lg m-1 border-slate-600 py-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isFirstColumn ? {} : listeners)}
    >
      <p className="uppercase">{column}</p>
      {!isFirstColumn && (
        <button
          data-no-dnd="true"
          className="bg-red-200 p-1 rounded-lg ml-0 m-1 "
          onClick={() => removeColumn(column)}
        >
          <FontAwesomeIcon icon={faTrash} size="1x" />
        </button>
      )}
    </div>
  );
};

export default SortableColumn;
