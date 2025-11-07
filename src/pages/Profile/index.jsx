import { useParams } from "react-router";

import SideBar from "../../components/SideBar";
import NutritionInfo from "../../components/NutritionInfo";

import useFetch from "../../utils/hooks/useFetch";

import "./Profile.scss";
import energyIcon from "../../assets/energy.png";
import chickenIcon from "../../assets/chicken.png";
import appleIcon from "../../assets/apple.png";
import cheeseburgerIcon from "../../assets/cheeseburger.png";

export default function Profile() {
  const params = useParams();
  const { data, error } = useFetch(`http://localhost:3000/user/${params.id}`);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar />
        <main className="profile__main">
          <div>
            {data && (
              <>
                <h1 className="profile__title">
                  Bonjour <span>{data.userInfos.firstName}</span>
                </h1>
                <p className="profile__congrats">
                  Félicitation ! Vous avez explosé vos objectifs hier 👏
                </p>

                <div className="profile__data">
                  <div className="profile__nutrition-data">
                    <NutritionInfo
                      icon={energyIcon}
                      bgColor="#FF01011A"
                      amount={data.keyData.calorieCount}
                      unit="kCal"
                      text="Calories"
                    />
                    <NutritionInfo
                      icon={chickenIcon}
                      bgColor="#4AB8FF1A"
                      amount={data.keyData.proteinCount}
                      unit="g"
                      text="Proteines"
                    />
                    <NutritionInfo
                      icon={appleIcon}
                      bgColor="#F9CE231A"
                      amount={data.keyData.carbohydrateCount}
                      unit="g"
                      text="Glucides"
                    />
                    <NutritionInfo
                      icon={cheeseburgerIcon}
                      bgColor="#FD51811A"
                      amount={data.keyData.lipidCount}
                      unit="g"
                      text="Lipides"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
