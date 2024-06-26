"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import projectImage from "../assets/images/home1.png";
import personaImage from "../assets/images/home2.png";
import journeyImage from "../assets/images/home3.png";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 text-black">
        <h1 className="text-2xl font-bold mt-10">Welcome, Douglas!</h1>
        <div className="py-4 mt-8">
          <button className="bg-slate-300 py-2 px-7 flex items-center rounded-md text-black w-full">
            <span className="mx-auto text-lg font-semibold">
              See your Journeys
            </span>
          </button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 mt-8">
          <Card
            title="Create Project"
            icon={faPlus}
            image={projectImage.src}
            bgColor="bg-yellow-400"
          />
          <Card
            title="Create Persona"
            icon={faUser}
            image={personaImage.src}
            bgColor="bg-purple-400"
          />
          <Card
            title="Create Journey"
            icon={faPlus}
            image={journeyImage.src}
            bgColor="bg-green-400"
          />
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  icon: any;
  image: string;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ title, icon, image, bgColor }) => {
  return (
    <div className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden p-8">
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="py-4 mt-8">
        <button
          className={`${bgColor} p-2 flex items-center rounded-md text-white w-full	`}
        >
          <FontAwesomeIcon icon={icon} size="1x" className="mx-3" />
          <span className="mx-auto text-lg font-semibold">{title}</span>
        </button>
      </div>
    </div>
  );
};
