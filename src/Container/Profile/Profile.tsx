import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import AdjacentIconName from "../../Components/AdjacentIconName";
import {
  getSearchedUserData,
  getSearchedUserError,
  getSearchedUserLoading,
  getUser,
} from "../../redux/selector/restApiSelector";
import { Ti, Md } from "../../Config/iconConfig";
import ChartComponent from "../../Components/ChartComponent";
import { Button, Radio, Typography } from "antd";
import Search from "antd/lib/input/Search";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import Spinner from "../../antDesign/Spinner";
import Icons from "../../Util/Icons";
import { LoginReducerKeyTypes, RestApiTypes } from "../../Util/globalConstants";
import {
  chartOptions,
  getData,
  getGeneralInfo,
  PROFILE_CHART_COLOR,
} from "./helper";

interface ProfileProps {
  propsUserName?: string;
  search?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ propsUserName, search }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<"1" | "2" | "3">("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>(propsUserName || "");

  const selectorFunction = value ? getSearchedUserData : getUser;
  const userData: RestData = useSelector(selectorFunction);
  const searchedUserLoadingState = useSelector(getSearchedUserLoading);
  const searchedUser = useSelector(getSearchedUserData);
  const searchedUserError = useSelector(getSearchedUserError);
  const authUser = useSelector(getUser);
  const dispatch = useDispatch();

  const { profileImage, userBio, userName } = userData;

  useEffect(() => {
    if (propsUserName) {
      handleSearch(propsUserName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsUserName]);

  useEffect(() => {
    if (loading) {
      if (searchedUserLoadingState === false) {
        setLoading(false);
        if (searchedUserError === true) {
          setError("error");
        }
      }
    }
  }, [searchedUserLoadingState, loading, searchedUserError]);

  const handleSearch = (value: any) => {
    setLoading(true);
    setValue(value);
    if (value) {
      dispatch(
        actionCreator(actions.RESTAPI_READ, {
          type: RestApiTypes.SEARCHED_USER_GET,
          value,
        })
      );
    } else {
      setLoading(false);
      dispatch(
        actionCreator(actions.SET_LOGIN_STATE, {
          [LoginReducerKeyTypes.SEARCHED_USER]: {},
        })
      );
    }
  };

  const handleButtonClick = () => {
    setValue("");
    setError("");
    dispatch(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.SEARCHED_USER_ERROR]: false,
        [LoginReducerKeyTypes.SEARCHED_USER]: {},
      })
    );
  };

  const handleFollowFeature = (type: string) => {
    let url =
      type === "Followers"
        ? searchedUser.followers_url
        : searchedUser.following_url;
    if (type === "Following") {
      const index = url.indexOf("{");
      url = url.substring(0, index);
    }
    window.open(`/follow?url=${url}&authUser=${authUser.userName}`);
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
                {(getGeneralInfo(userData) || {}).map((info, index) => (
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
            {Object.keys(searchedUser).length > 0 && (
              <>
                <Button
                  type="primary"
                  onClick={() => handleFollowFeature("Followers")}
                  style={{ marginRight: "1rem" }}
                  size="small"
                >
                  Followers
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleFollowFeature("Following")}
                  size="small"
                >
                  Following
                </Button>
              </>
            )}
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
                  data={getData(userData)}
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
