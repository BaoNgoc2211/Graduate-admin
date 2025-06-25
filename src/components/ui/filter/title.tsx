interface TitleProps {
  text1: string;
  text2: string;
}
const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {text1}
        <span className="text-blue-700 font-bold">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] s,:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
