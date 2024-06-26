"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MouseSensor } from "./MouseSensor";
import SortableRow from "./SortableRow";
import SortableColumn from "./SortableColumn";
import { Interaction, Row } from "@/schemas/types";
import Modal from "../Modal";

const initialColumns = ["stage", "payment", "arrived"];
const newColumnsStages: string[] = ["payment", "arrived", "questions", "sales"];

const initialRows = [
  { id: "3", stage: "Customer", name: "Antonio", age: 76 },
  { id: "2", stage: "Oportunities", name: "Jacob", age: 26 },
  { id: "1", stage: "Image", name: "Samuel", age: 23 },
  { id: "4", stage: "Emotional", name: "Frijol", age: 76 },
];
const newRowsinteractions: Interaction[] = [
  { id: "5", stage: "Time", name: "Interaction 1", age: 23 },
  { id: "6", stage: "Channel", name: "Interaction 2", age: 26 },
  { id: "7", stage: "Process", name: "Interaction 3", age: 76 },
  { id: "8", stage: "Motivation", name: "Interaction 4", age: 76 },
];

interface SortableTableProps {
  initialRows: Row[];
  initialColumns: string[];
}

const SortableTable: React.FC<SortableTableProps> = ({
  initialRows,
  initialColumns,
}) => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [showModalStage, setShowModalStage] = useState(false);
  const [showModalInteraction, setShowModalInteraction] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleRowDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rows.findIndex((row) => row.id === active.id);
      const newIndex = rows.findIndex((row) => row.id === over.id);
      setRows((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleColumnDragEnd = (event: any) => {
    const { active, over } = event;
    if (columns.indexOf(active.id) === 0 || columns.indexOf(over.id) === 0) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);
      setColumns((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleAddStage = (stage: string) => {
    setColumns((prev) => [...prev, stage]);
    setRows(rows.map((row) => ({ ...row, [stage]: stage })));
    setShowModalStage(false);
  };

  const handleAddInteraction = (interaction: Interaction) => {
    setRows((prev) => [...prev, interaction]);
    setShowModalInteraction(false);
  };

  const columnClasses: { [key: number]: string } = {
    ...columns.reduce(
      (accumulator: any, _: any, index: any) => ({
        ...accumulator,
        [index + 1]: `grid-cols-${index + 1}`,
      }),
      {}
    ),
  };

  const removeColumn = (column: string) =>
    setColumns((prevColumns) => prevColumns.filter((col) => col !== column));

  const removeRow = (row: Row) =>
    setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));

  return (
    <div className="p-16">
      <div className="flex justify-between align-center">
        <h1 className="text-3xl mb-8">Journey</h1>
        <div>
          <button
            onClick={() => setShowModalStage(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full"
          >
            <FontAwesomeIcon icon={faPlus} size="1x" />
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleColumnDragEnd}
      >
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          <div className={`grid ${columnClasses[columns.length]}`}>
            {columns.map((column, index) => (
              <SortableColumn
                key={column}
                id={column}
                column={column}
                isFirstColumn={index === 0}
                removeColumn={removeColumn}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleRowDragEnd}
      >
        <SortableContext
          items={rows.map((row) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          {rows.map((row) => (
            <SortableRow
              key={row.id}
              id={row.id}
              columns={columns}
              row={row}
              removeRow={removeRow}
            />
          ))}
          <div>
            <button
              className="w-full py-4 border-solid border-2 rounded-lg m-1 border-slate-600"
              onClick={() => setShowModalInteraction(true)}
            >
              Add Interaction
            </button>
          </div>
        </SortableContext>
      </DndContext>

      {showModalStage && (
        <Modal
          title="Add a Stage"
          showModal={showModalStage}
          setShowModal={setShowModalStage}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {newColumnsStages.map((stage, index) =>
              columns.includes(stage) ? (
                <div
                  key={index}
                  className="cursor-not-allowed flex justify-center p-8 rounded-lg shadow-lg bg-slate-100 btn"
                >
                  {stage}
                </div>
              ) : (
                <div
                  key={index}
                  className="cursor-pointer flex justify-center p-8 rounded-lg shadow-lg bg-slate-300 btn"
                  onClick={() => handleAddStage(stage)}
                >
                  <p className="uppercase">{stage}</p>
                </div>
              )
            )}
          </div>
        </Modal>
      )}

      {showModalInteraction && (
        <Modal
          title="Add an Interaction"
          showModal={showModalInteraction}
          setShowModal={setShowModalInteraction}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {newRowsinteractions.map((interaction) =>
              rows.map((row) => row.name).includes(interaction.name) ? (
                <div
                  key={interaction.id}
                  className="cursor-not-allowed flex justify-center p-8 rounded-lg shadow-lg bg-slate-100 btn"
                >
                  {interaction.name}
                </div>
              ) : (
                <div
                  key={interaction.id}
                  className="cursor-pointer justify-center p-8 rounded-lg shadow-lg bg-slate-300 btn"
                  onClick={() => handleAddInteraction(interaction)}
                >
                  {interaction.name}
                </div>
              )
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SortableTable;
