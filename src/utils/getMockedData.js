import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/userData";

export default function getMockedData(url) {
  const regexp = /\/user\/(\d+)(\/.*)?/;
  const urlMatch = url.match(regexp);
  if (!urlMatch) {
    return null;
  } else {
    const id = +urlMatch[1];
    const resource = urlMatch[2];

    if (resource === "/" || !resource) {
      return USER_MAIN_DATA.find((data) => data.id === id);
    } else if (resource.match(/^\/activity\/?$/)) {
      return USER_ACTIVITY.find((data) => data.userId === id);
    } else if (resource.match(/^\/average-sessions\/?$/)) {
      return USER_AVERAGE_SESSIONS.find((data) => data.userId === id);
    } else if (resource.match(/^\/performance\/?$/)) {
      return USER_PERFORMANCE.find((data) => data.userId === id);
    } else {
      return null;
    }
  }
}
