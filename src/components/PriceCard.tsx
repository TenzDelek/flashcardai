import React from "react";

const PriceCard = ({
  tier,
  price,
  benefit,
}: {
  tier: string;
  price: number;
  benefit: string;
}) => {
  return (
    <div className=" border border-white/30 mt-4 bg-[#202020] h-64 flex p-3 flex-col items-center rounded-md justify-around mb-5">
      <div>
        <p className=" font-bold text-xl ">{tier}</p>
        <p className=" text-gray-400 text-sm">${price}/month</p>
      </div>
      <p className=" text-gray-400 text-sm">{benefit}</p>
      <button className=" p-2 bg-blue-500 text-white transition hover:bg-blue-700 rounded mt-2">
          Get {tier}
        </button>
    </div>
  );
};

export default PriceCard;
