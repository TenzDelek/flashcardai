import React from "react";

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className=" border cursor-pointer p-4 rounded-md border-slate-500">
      <p className=" font-bold text-xl ">{title}</p>
      <p className=" text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
