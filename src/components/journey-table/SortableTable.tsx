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

const newColumnsStages: string[] = ["payment", "arrived", "questions", "sales"];
const newRowsinteractions: Interaction[] = [
  { id: "3", stage: "Customer", delivery: "Antonio", products: 28 },
  { id: "4", stage: "Emotional", delivery: "Emmanuel", products: 570 },
  { id: "5", stage: "Time", delivery: "Three Times" },
  { id: "6", stage: "Channel", payment: "Every Week" },
  { id: "7", stage: "Process", arrived: "Fortnightly" },
  { id: "8", stage: "Motivation", questions: "Yes or Not" },
  { id: "9", stage: "Falt", arrived: "Every Day" },
  { id: "10", stage: "Error", sales: "Never" },
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
    // setRows(rows.map((row) => ({ ...row, [stage]: stage })));
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
    <div className="p-16 text-xs	">
      <div className="flex justify-between align-center">
        <h1 className="text-3xl ml-3 mb-8 font-semibold">Journey</h1>
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
          <div className={`grid grid-cols-[250px_1fr] gap-4`}>
            <SortableColumn
              key={columns[0]}
              id={columns[0]}
              column={columns[0]}
              isFirstColumn={true}
              removeColumn={removeColumn}
            />
            <div className={`grid ${columnClasses[columns.length]}`}>
              {columns.map(
                (column, index) =>
                  index !== 0 && (
                    <SortableColumn
                      key={column}
                      id={column}
                      column={column}
                      isFirstColumn={index === 0}
                      removeColumn={removeColumn}
                    />
                  )
              )}
              <div className="flex items-center">
                <button
                  onClick={() => setShowModalStage(true)}
                  className="bg-slate-400 ml-5 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </button>
              </div>
            </div>
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
          <div className={`grid grid-cols-[250px_1fr] gap-4`}>
            <div className="flex justify-start ml-3">
              <button
                onClick={() => setShowModalInteraction(true)}
                title="Add Interaction"
                className="bg-slate-400 mt-5 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md"
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
              </button>
            </div>
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
                  <p className="capitalize">{stage}</p>
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
              rows.map((row) => row.stage).includes(interaction.stage) ? (
                <div
                  key={interaction.id}
                  className="cursor-not-allowed flex justify-center p-8 rounded-lg shadow-lg bg-slate-100 btn"
                >
                  {interaction.stage}
                </div>
              ) : (
                <div
                  key={interaction.id}
                  className="cursor-pointer flex justify-center p-8 rounded-lg shadow-lg bg-slate-300 btn"
                  onClick={() => handleAddInteraction(interaction)}
                >
                  {interaction.stage}
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
