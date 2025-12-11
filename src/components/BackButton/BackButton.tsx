import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex cursor-pointer rounded p-2 hover:bg-gray-200"
    >
      <img alt="" src={"/back.svg"} width="24" height="24" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
