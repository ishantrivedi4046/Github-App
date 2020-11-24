import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import AdjacentIconName from "../../Components/AdjacentIconName";
import {
  getOuthToken,
  getSearchedUserData,
  getUser,
} from "../../redux/selector/restApiSelector";
import * as Vsc from "react-icons/vsc";
import * as Ti from "react-icons/ti";
import * as Im from "react-icons/im";
import * as Hi from "react-icons/hi";
import * as Md from "react-icons/md";
import ChartComponent from "../../Components/ChartComponent";
import { Button, Radio, Typography } from "antd";
import Search from "antd/lib/input/Search";
import api from "../../Apiservice/loginSerice";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import Spinner from "../../antDesign/Spinner";
import Icons from "../../Util/Icons";

const chartOptions = { "1": "LINE", "2": "BAR", "3": "AREA" };
export const PROFILE_CHART_COLOR = "#1890ff";

interface ProfileProps {
  propsUserName?: string;
  search?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ propsUserName, search }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<"1" | "2" | "3">("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const selectorFunction = value ? getSearchedUserData : getUser;
  const userData: any = useSelector(selectorFunction);
  const searchedUser = useSelector(getSearchedUserData);
  const dispatch = useDispatch();

  const { profileImage, userBio, userName, realName, location } = userData;

  useEffect(() => {
    if (propsUserName) {
      handleSearch(propsUserName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsUserName]);

  const data = [
    { name: "Public Repo", Count: userData.publicRepos },
    { name: "Private Repo", Count: userData.privateRepos },
    { name: "Public Gists", Count: userData.publicGists },
    { name: "Private Gists", Count: userData.privateGists },
    { name: "Followers", Count: userData.userFollowers },
    { name: "Following", Count: userData.userFollowing },
    { name: "Collaborators", Count: userData.collaborators },
  ].filter((item) => item.Count !== -1);

  let generalInfo = [
    {
      icon: Vsc.VscSymbolNamespace,
      content: realName,
    },
    { icon: Ti.TiLocation, content: location },
    { icon: Im.ImBlog, content: userData.userBlog },
    { icon: Hi.HiOutlineMail, content: userData.userEmail },
    { icon: Im.ImTwitter, content: userData.twitterHandle },
    { icon: Hi.HiOfficeBuilding, content: userData.userCompany },
  ];
  generalInfo = generalInfo.filter((info) => !(info.content === null));

  const handleSearch = (value: any) => {
    setLoading(true);
    setValue(value);
    if (value) {
      api
        .getSearchedUser(value, getOuthToken())
        .then((res) => {
          const searchedData = new RestData(res.data);
          setLoading(false);
          setError("");
          dispatch(
            actionCreator(actions.SET_SEARCHED_USER_DATA, {
              data: searchedData,
            })
          );
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      setLoading(false);
      dispatch(
        actionCreator(actions.SET_SEARCHED_USER_DATA, {
          data: {},
        })
      );
    }
  };

  const handleButtonClick = () => {
    setValue("");
    setError("");
    dispatch(
      actionCreator(actions.SET_SEARCHED_USER_DATA, {
        data: {},
      })
    );
  };

  return loading ? (
    <Spinner size="large" tip="Finding User" />
  ) : (
    <>
      <div className="profile-container">
        {search && (
          <Button
            type="primary"
            size="large"
            onClick={handleButtonClick}
            icon={<Icons Value={Md.MdArrowBack} className="goBack" />}
            shape="circle"
            disabled={Object.keys(searchedUser).length === 0 && error === ""}
          />
        )}
        {error ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title
              level={3}
              style={{ color: `${PROFILE_CHART_COLOR}` }}
            >
              "No such user exists!"
            </Typography.Title>
          </div>
        ) : (
          <>
            {search && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Search
                  placeholder="input search github user"
                  onSearch={(value: any) => {
                    handleSearch(value);
                  }}
                  enterButton
                  style={{ width: "24rem" }}
                />
              </div>
            )}
            <div className="profile-header">
              <img
                src={profileImage}
                alt="userimage"
                className="profile-header-image"
              />
              <div className="titles">
                <div className="titles-1">{userName}</div>
                {generalInfo.map((info, index) => (
                  <AdjacentIconName
                    value={info.icon}
                    content={info.content ? info.content : "No Data"}
                    containerClassName="detailContainerStyle"
                    contentClassName="contentStyle"
                    IconClassName="iconStyle"
                    propkey={index}
                  />
                ))}
              </div>
            </div>
            <AdjacentIconName
              value={Ti.TiPencil}
              content={!userBio ? "No Bio" : userBio}
              containerClassName="containerStyle"
              IconClassName="containerStyle-icon"
              contentClassName="containerStyle-content"
              propkey="bio"
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
            <div
              style={{ width: "100%", display: "flex", justifyContent: "end" }}
            >
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
          </>
        )}
      </div>
    </>
  );
};

Profile.defaultProps = {
  search: true,
  propsUserName: "",
};

export default Profile;
