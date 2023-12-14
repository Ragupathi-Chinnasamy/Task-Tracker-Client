function Card({ title, count }: { title: string; count: number }) {
  return (
    <div className="relative bg-gray-100">
      <div className="absolute animate-tilt bg-gradient-to-br from-teal-600 to-purple-800 blur inset-0 filter shadow-md" />
      <div className="relative bg-white p-5 flex flex-col gap-2 rounded-md hover:scale-105 transition delay-75">
        <span className="text-5xl font-extrabold bg-gradient-to-b from-teal-600 to-purple-800 text-transparent bg-clip-text">
          {count}
        </span>
        <span className="tracking-wider font-montserrat font-extrabold text-gray-900/80">
          {title}
        </span>
      </div>
    </div>
  );
}

export default Card;
