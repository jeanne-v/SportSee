import { useParams } from "react-router";

import SideBar from "../../components/SideBar";

import useFetch from "../../utils/hooks/useFetch";

import "./Profile.scss";

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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
