import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import AdjacentIconName from "../../Components/AdjacentIconName";
import { getUser } from "../../redux/selector/loginSelector";
import * as Vsc from "react-icons/vsc";
import * as Ti from "react-icons/ti";
import * as Im from "react-icons/im";
import * as Hi from "react-icons/hi";
import ChartComponent from "../../Components/ChartComponent";
import { Radio } from "antd";

const chartOptions = { "1": "LINE", "2": "BAR", "3": "AREA" };
const PROFILE_CHART_COLOR = "#1890ff";

const Profile = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<"1" | "2" | "3">("1");
  const userData: RestData = useSelector(getUser);
  const { profileImage, userBio, userName, realName, location } = userData;
  const data = [
    { name: "Public Repo", Count: userData.publicRepos },
    { name: "Private Repo", Count: userData.privateRepos },
    { name: "Public Gists", Count: userData.publicGists },
    { name: "Private Gists", Count: userData.privateGists },
    { name: "Followers", Count: userData.userFollowers },
    { name: "Following", Count: userData.userFollowing },
    { name: "Collaborators", Count: userData.collaborators },
  ];

  const generalInfo = [
    {
      icon: Vsc.VscSymbolNamespace,
      content: realName,
    },
    { icon: Ti.TiLocation, content: location },
    { icon: Im.ImBlog, content: userData.blog },
    { icon: Hi.HiOutlineMail, content: userData.email },
    { icon: Im.ImTwitter, content: userData.twitterHandle },
    { icon: Hi.HiOfficeBuilding, content: userData.userCompany },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profileImage}
          alt="userimage"
          className="profile-header-image"
        />
        <div className="titles">
          <div className="titles-1">{userName}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              background: "gray",
            }}
          >
            {generalInfo.map((info, index) => (
              <AdjacentIconName
                value={info.icon}
                content={info.content ? info.content : "No Data"}
                contentClassName="contentStyle"
                IconClassName="iconStyle"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <AdjacentIconName
        value={Ti.TiPencil}
        content={userBio}
        containerClassName="containerStyle"
        IconClassName="containerStyle-icon"
        contentClassName="containerStyle-content"
      />
      {visible && (
        <>
          <div className="radioContainer">
            <Radio.Group
              onChange={(e) => setRadioValue(e.target.value)}
              value={radioValue}
            >
              <Radio value="1" className="radioButton">
                LINE
              </Radio>
              <Radio value="2" className="radioButton">
                BAR
              </Radio>
              <Radio value="3" className="radioButton">
                AREA
              </Radio>
            </Radio.Group>
          </div>
          <ChartComponent
            data={data}
            Chart={chartOptions[radioValue]}
            xDataKey="name"
            yDataKey="Count"
            legend
            legendAlign="bottom"
            width="100%"
            height={325}
            LineStroke={PROFILE_CHART_COLOR}
            gridStroke="#ccc"
            barColor={PROFILE_CHART_COLOR}
            areaColor={PROFILE_CHART_COLOR}
          />
        </>
      )}
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <p
          onClick={() => setVisible((prev) => !prev)}
          style={{
            color: "#1890ff",
            fontWeight: "normal",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          {visible ? "Less" : "More"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
