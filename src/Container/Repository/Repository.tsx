import { Card, Col, Collapse, Drawer, Row, Spin, Typography } from "antd";
import { capitalize, get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../antDesign/Spinner";
import { REPOS } from "../../Apiservice/constants/restConstants";
import { RepoData } from "../../classes/RepoData";
import { RestData } from "../../classes/RestData";
import CommitCardComponent from "../../Components/CommitCardComponent";
import CustomTableComponent from "../../Components/CustomTableComponent";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getRepoBranches,
  getRepoLoading,
  getRepoState,
  getUser,
  getRepoBrancheCommits,
  getRepoCommitLoading,
} from "../../redux/selector/restApiSelector";
import { RestApiTypes } from "../../Util/globalConstants";
import { RepoColumns } from "./helper";

interface RepositoryProps {}

const Repository: React.FC<RepositoryProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDrawer, setShowDrawer] = useState<any>(undefined);
  const repoDataState = useSelector(getRepoState);
  const repoLoading = useSelector(getRepoLoading);
  const dispatch = useDispatch();
  const user: RestData = useSelector(getUser);
  const repoBranches = useSelector(getRepoBranches);
  const repoBrancheCommits = useSelector(getRepoBrancheCommits);

  useEffect(() => {
    dispatch(
      actionCreator(actions.RESTAPI_READ, {
        type: RestApiTypes.GET_REPOS,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      if (!repoLoading) {
        setLoading(false);
      }
    }
  }, [repoLoading, loading]);

  const handleShowDrawer = (record: RepoData) => {
    setShowDrawer(record);
  };

  const handlePanelChange = (key: any, name: string) => {
    if (key !== undefined) {
      const keySplit = key.split("_");
      const url = `${REPOS}/${user.userName}/${name}/commits/${keySplit[1]}`;
      const commitKey = `${keySplit[0]}_${keySplit[2]}`;
      if (!Object.keys(repoBrancheCommits).includes(commitKey)) {
        dispatch(
          actionCreator(actions.RESTAPI_READ, {
            type: RestApiTypes.GET_REPO_BRANCH_COMMITS,
            url,
            id: commitKey,
          })
        );
      }
    }
  };

  const getCommitRecord = (repoId: string, branchName: string) => {
    const key = `${repoId}_${branchName}`;
    return repoBrancheCommits?.[key] || {};
  };

  if (loading) {
    return <Spinner size="large" />;
  }

  return (
    <>
      <Drawer
        width={"64rem"}
        visible={showDrawer !== undefined}
        title={<Typography.Title level={3}>REPO DETAILS</Typography.Title>}
        placement="right"
        closable
        onClose={() => setShowDrawer(undefined)}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <h3>{showDrawer?.name}</h3>
            <p>{showDrawer?.description || "No Description"}</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <div style={{ display: "flex" }}>
              <h4>Full Name : </h4>
              <p style={{ marginLeft: "0.5rem" }}>{showDrawer?.full_name}</p>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: "flex" }}>
              <h4>Type : </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                {showDrawer?.isPrivate === true ? "Private" : "Public"}
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: "flex" }}>
              <h4>Forked : </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                {showDrawer?.isForked === true
                  ? "Yes"
                  : showDrawer?.isForked === undefined
                  ? "No Info"
                  : "false"}
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div style={{ display: "flex" }}>
              <h4>Created At : </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                <span>{new Date(showDrawer?.created_at).toUTCString()}</span>
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div style={{ display: "flex" }}>
              <h4>Updated At : </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                <span>{new Date(showDrawer?.updated_at).toUTCString()}</span>
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <div style={{ display: "flex" }}>
              <h4>Default Branch: </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                {showDrawer?.default_branch !== undefined
                  ? capitalize(showDrawer?.default_branch)
                  : "No Info"}
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: "flex" }}>
              <h4>Forks Count : </h4>
              <p style={{ marginLeft: "0.5rem" }}>{showDrawer?.forks_count}</p>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: "flex" }}>
              <h4>Open Issue Count : </h4>
              <p style={{ marginLeft: "0.5rem" }}>
                {showDrawer?.open_issue_count}
              </p>
            </div>
          </Col>
        </Row>
      </Drawer>
      <CustomTableComponent
        type={"Repositories"}
        columns={RepoColumns(handleShowDrawer)}
        dataSource={repoDataState}
        expandable={{
          expandedRowRender: (record: RepoData) => {
            const branches = repoBranches?.[record.id] || [];
            if (repoLoading) {
              return (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <Spin size="default" style={{ padding: "2rem" }} />
                </div>
              );
            }
            return (
              <Collapse
                accordion
                ghost
                onChange={(key: string | string[]) =>
                  handlePanelChange(key, record.name)
                }
              >
                {branches.length > 0 &&
                  branches.map((branch: any, index: number) => (
                    <Collapse.Panel
                      key={`${record.id}_${get(
                        branch,
                        ["commit", "sha"],
                        index
                      )}_${branch.name}`}
                      header={branch.name}
                      style={{ fontWeight: "bold" }}
                    >
                      <CommitCardComponent
                        commitRecord={getCommitRecord(record.id, branch.name)}
                      />
                    </Collapse.Panel>
                  ))}
              </Collapse>
            );
          },
          onExpand: (expanded: boolean, record: RepoData) => {
            if (
              expanded &&
              !Object.keys(repoBranches).includes(record.id.toString())
            ) {
              const url = `${REPOS}/${user.userName}/${record.name}/branches`;
              dispatch(
                actionCreator(actions.RESTAPI_READ, {
                  type: RestApiTypes.GET_REPO_BRANCHES,
                  url,
                  id: record.id,
                })
              );
            }
          },
        }}
      />
    </>
  );
};

export default Repository;
