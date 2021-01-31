import { Button, Table, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../antDesign/Spinner";
import api from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { getFollowColumns } from "../../Config/followTableConfig";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getFollowersList,
  getOuthToken,
  getUser,
} from "../../redux/selector/restApiSelector";
import Profile, { PROFILE_CHART_COLOR } from "../Profile/Profile";

interface FollowersProps {
  url?: string;
  type?: string;
}

const Followers: React.FC<FollowersProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const currentUserData = useSelector(getUser);
  const userData: RestData = currentUserData;
  const [searchedValue, setSearchedValue] = useState("");
  const followersList = useSelector(getFollowersList);
  const dispatch = useDispatch();
  const { followers_url } = userData;
  const URL = props.url ? props.url : followers_url;

  const fakeData = [
    {
      avatar_url: userData.avatar_url,
      username: userData.userName,
      key: "fake",
    },
  ];

  const dataSource = followersList.map((item: RestData, index: number) => ({
    avatar_url: item.avatar_url,
    username: item.username,
    key: index,
  }));

  const handleViewProfile = (record: any) => {
    setVisible(true);
    setSearchedValue(record.username);
  };

  useEffect(() => {
    if (loading) {
      api
        .getAuthUserdataList(URL, getOuthToken())
        .then((res) => {
          const listData = res.data.map((item: any) => new RestData(item));
          setLoading(false);
          dispatch(
            actionCreator(actions.SET_FOLLOWERS_LIST, { data: listData })
          );
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, loading]);

  const handleModalClose = () => {
    setVisible(false);
    setSearchedValue("");
    dispatch(
      actionCreator(actions.SET_SEARCHED_USER_DATA, {
        data: {},
      })
    );
  };

  return loading ? (
    <Spinner size="large" tip="Getting Info!" />
  ) : (
    <>
      <Modal
        footer={[
          <Button type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        onCancel={handleModalClose}
        centered
        visible={visible}
        destroyOnClose
        style={{ minWidth: "78rem" }}
      >
        <Profile search={false} propsUserName={searchedValue} />
      </Modal>
      <Table
        columns={getFollowColumns(handleViewProfile)}
        dataSource={dataSource.length === 0 ? fakeData : dataSource}
        style={{ margin: "2rem" }}
        pagination={{}}
      />
    </>
  );
};

Followers.defaultProps = {
  url: "",
  type: "Followers",
};

export default Followers;
