export default function harmonizeUserData(data) {
  if (data.userInfos) {
    return new UserMainDataObj(data);
  } else {
    return data;
  }
}

class UserMainDataObj {
  constructor(obj) {
    const { id, userInfos, todayScore, score, keyData } = obj;
    this.id = id;
    this.userInfos = userInfos;
    this.keyData = keyData;

    this._todayScore = todayScore;
    this._score = score;
  }

  get todayScore() {
    return this._todayScore ? this._todayScore : this._score;
  }
}
