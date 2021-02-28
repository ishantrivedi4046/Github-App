import { Card, Col, Row, Spin, Tabs } from "antd";
import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { getRepoCommitLoading } from "../redux/selector/restApiSelector";

interface ComitCardProps {
  commitRecord: any;
}

const CommitCardComponent: React.FC<ComitCardProps> = ({ commitRecord }) => {
  const repoCommitLoading = useSelector(getRepoCommitLoading);
  const commit = get(commitRecord, ["commit"], {});
  const author = get(commit, ["author"], "No Author");
  const commiter = get(commit, ["committer"], "No Author");
  const files = get(commitRecord, ["files"], []);
  const stats = get(commitRecord, ["stats"], []);

  const dataObject = [
    {
      title: "Author Name",
      subtitle: author?.name,
    },
    {
      title: "Author Email",
      subtitle: author?.email,
    },
    {
      title: "Author Publishing Date",
      subtitle: author?.date,
    },
    { title: "Committer Name", subtitle: commiter?.name },
    { title: "Committer Email", subtitle: commiter?.email },
    { title: "Committer Commiting Date", subtitle: commiter?.date },
  ];

  if (repoCommitLoading) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <Spin size="default" style={{ padding: "2rem" }} />
      </div>
    );
  }
  return (
    <Card title={commit?.message} style={{ width: "100%" }}>
      {dataObject.map((item: any, index: number) => {
        return (
          <Row key={index}>
            <Col span={24} style={{ display: "flex" }}>
              <h2>{item.title}</h2>
              <p style={{ paddingLeft: "0.5rem" }}>{item.subtitle}</p>
            </Col>
          </Row>
        );
      })}
      <Tabs>
        {files.map((file: any) => {
          return (
            <Tabs.TabPane tab={file?.filename} tabKey={file?.sha}>
              <Row>
                <Col span={24} style={{ display: "flex" }}>
                  <h2>Status</h2>
                  <p style={{ paddingLeft: "0.5rem" }}>{file?.status}</p>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ display: "flex" }}>
                  <h2>Patch : </h2>
                  <p style={{ paddingLeft: "0.5rem" }}>{file?.status}</p>
                </Col>
              </Row>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default CommitCardComponent;
