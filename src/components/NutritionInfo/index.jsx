import "./NutritionInfo.css";

export default function NutritionInfo({ icon, bgColor, amount, unit, text }) {
  return (
    <div className="nutrition-info">
      <div
        className="nutrition-info__icon-container"
        style={{ backgroundColor: bgColor }}
      >
        <img className="nutrition-info__icon" src={icon} alt="" />
      </div>
      <div>
        <p className="nutrition-info__amount">
          {amount.toLocaleString("en-US")}
          {unit}
        </p>
        <p className="nutrition-info__type">{text}</p>
      </div>
    </div>
  );
}
