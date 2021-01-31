import { RestData } from "../../classes/RestData";
import { Vsc, Ti, Im, Hi } from "../../Config/iconConfig";
export const getData = (userData: RestData) => {
  const data = [
    { name: "Public Repo", Count: userData.userPublicRepos },
    { name: "Private Repo", Count: userData.privateRepos },
    { name: "Public Gists", Count: userData.publicGists },
    { name: "Private Gists", Count: userData.privateGists },
    { name: "Followers", Count: userData.userFollowers },
    { name: "Following", Count: userData.userFollowing },
    { name: "Collaborators", Count: userData.collaborators },
  ].filter((item) => item.Count !== -1);
  return data;
};

export const getGeneralInfo = (userData: RestData) => {
  let generalInfo = [
    {
      icon: Vsc.VscSymbolNamespace,
      content: userData.realName,
    },
    { icon: Ti.TiLocation, content: userData.location },
    { icon: Im.ImBlog, content: userData.userBlog },
    { icon: Hi.HiOutlineMail, content: userData.userEmail },
    { icon: Im.ImTwitter, content: userData.twitterHandle },
    { icon: Hi.HiOfficeBuilding, content: userData.userCompany },
  ];
  generalInfo = generalInfo.filter((info) => !(info.content === null));
  return generalInfo;
};

export const chartOptions = { "1": "LINE", "2": "BAR", "3": "AREA" };
export const PROFILE_CHART_COLOR = "#1890ff";
