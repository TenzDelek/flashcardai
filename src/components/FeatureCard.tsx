import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="group bg-black/10 backdrop-blur-lg  border-white/40 shadow-lg border  p-4 rounded-md border-slate-500">
      <p className="flex items-center gap-2 font-bold text-xl ">{title}   <span className=" relative overflow-hidden h-fit w-fit">
              <GoArrowUpRight className="group-hover:-translate-y-5 group-hover:translate-x-5 duration-500 transition-transform ease-in-out-circ fill-light-gray stroke-[0.2]" />
              <GoArrowUpRight className="absolute top-0 group-hover:translate-x-0 duration-500 group-hover:translate-y-0 transition-all ease-in-out-circ translate-y-5 -translate-x-5 fill-light-gray stroke-[0.2]" />
            </span></p>
      <p className=" text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
