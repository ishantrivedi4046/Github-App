import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router";
import Spinner from "../../antDesign/Spinner";
import CustomTableComponent from "../../Components/CustomTableComponent";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getSShKeyListState,
  getSShKeyListStateLoading,
} from "../../redux/selector/restApiSelector";
import { RestApiTypes } from "../../Util/globalConstants";
import { sshColumns } from "./helper";

interface Props extends RouteProps {}

const SshKeysComponent: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModel] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [publicKey, setKey] = useState<string>("");
  const dispatch = useDispatch();
  const sshListLoadingState = useSelector(getSShKeyListStateLoading);
  const sshListState = useSelector(getSShKeyListState);
  const debouncedTitleSet = debounce(setTitle, 200);
  const debouncedKeySet = debounce(setKey, 100);

  console.log("from ssh component", sshListState);

  useEffect(() => {
    dispatch(
      actionCreator(actions.RESTAPI_READ, {
        type: RestApiTypes.LIST_SSH,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      if (!sshListLoadingState) {
        setLoading(false);
      }
    }
  }, [sshListLoadingState, loading]);

  const handleKeyDelete = (id: any) => {
    dispatch(
      actionCreator(actions.RESTAPI_READ, {
        type: RestApiTypes.DELETE_SSH,
        id,
      })
    );
  };

  const debouncedDelete = debounce(handleKeyDelete, 300);
  const getColumns = () => {
    return sshColumns(debouncedDelete);
  };

  const handleShowModel = () => {
    setShowModel(true);
  };

  const handleModalOk = () => {
    setShowModel(false);
    dispatch(
      actionCreator(actions.RESTAPI_READ, {
        type: RestApiTypes.CREATE_SSH,
        data: {
          title,
          key: publicKey,
        },
      })
    );
  };

  if (loading) return <Spinner size="large" tip="Getting Keys!" />;

  return (
    <>
      <Modal
        onOk={handleModalOk}
        onCancel={() => {
          setTitle("");
          setKey("");
          setShowModel(false);
        }}
        visible={showModal}
        closable={false}
      >
        <Form.Item label={"Title"}>
          <Input
            required
            value={title}
            onChange={(e: any) => debouncedTitleSet(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Public Key">
          <Input.TextArea
            required
            value={publicKey}
            onChange={(e: any) => debouncedKeySet(e.target.value)}
            rows={8}
          />
        </Form.Item>
      </Modal>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
            marginRight: "2rem",
          }}
        >
          <Button
            type="primary"
            onClick={handleShowModel}
            style={{ width: "18rem" }}
          >
            Add New SSH Key
          </Button>
        </div>
        <CustomTableComponent
          type={"ssh keys"}
          columns={getColumns()}
          dataSource={sshListState}
        />
      </div>
    </>
  );
};

export default SshKeysComponent;
