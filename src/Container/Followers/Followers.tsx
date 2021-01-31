import { Button, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../antDesign/Spinner";
import { RestData } from "../../classes/RestData";
import { getFollowColumns } from "../../Config/followTableConfig";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getFollowersList,
  getFollowListLoading,
  getUser,
} from "../../redux/selector/restApiSelector";
import { LoginReducerKeyTypes, RestApiTypes } from "../../Util/globalConstants";
import Profile from "../Profile/Profile";

interface FollowersProps {
  url?: string;
  type?: string;
}

const Followers: React.FC<FollowersProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const currentUserData: RestData = useSelector(getUser);
  const [searchedValue, setSearchedValue] = useState("");
  const followersList = useSelector(getFollowersList);
  const followListLoadingState = useSelector(getFollowListLoading);
  const dispatch = useDispatch();
  const URL = props.url ? props.url : currentUserData?.followersUrl;

  const fakeData = [
    {
      avatar_url: currentUserData.profileImage,
      username: currentUserData.userName,
      key: "fake",
    },
  ];

  const dataSource = followersList.map((item: RestData, index: number) => ({
    avatar_url: item.profileImage,
    username: item.username,
    key: index,
  }));

  const handleViewProfile = (record: any) => {
    setVisible(true);
    setSearchedValue(record.username);
  };

  useEffect(() => {
    dispatch(
      actionCreator(actions.RESTAPI_READ, {
        type: RestApiTypes.FOLLOW_LIST,
        url: URL,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL]);

  useEffect(() => {
    if (loading) {
      if (followListLoadingState === false) {
        setLoading(false);
      }
    }
  }, [followListLoadingState, loading]);

  const handleModalClose = () => {
    setVisible(false);
    setSearchedValue("");
    dispatch(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.SEARCHED_USER]: {},
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

export default Followers;
