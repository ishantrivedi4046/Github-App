import { Card, Col, Row, Spin, Tabs } from "antd";
import { get } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getRepoCommitLoading } from "../redux/selector/restApiSelector";
import { CodeBlock, github } from "react-code-blocks";

interface ComitCardProps {
  commitRecord: any;
}

const CommitCardComponent: React.FC<ComitCardProps> = ({ commitRecord }) => {
  const repoCommitLoading = useSelector(getRepoCommitLoading);
  const commit = get(commitRecord, ["commit"], {});
  const author = get(commit, ["author"], "No Author");
  const commiter = get(commit, ["committer"], "No Author");
  const files = get(commitRecord, ["files"], []);
  const [activeKey, setActiveKey] = useState<any>(0);

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };

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
    <Card
      title={`Commit Message : ${commit?.message}`}
      style={{
        width: "104rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {dataObject.map((item: any, index: number) => {
        return (
          <Row key={index}>
            <Col span={6} style={{ color: "#083263" }}>
              <p>{item.title.toUpperCase()}</p>
            </Col>
            <Col span={2}>{" : "}</Col>
            <Col span={16} style={{ color: "#1890ff" }}>
              <p style={{ paddingLeft: "0.5rem", fontWeight: "lighter" }}>
                {item.subtitle}
              </p>
            </Col>
          </Row>
        );
      })}
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        style={{ marginTop: "2rem" }}
      >
        {files.map((file: any, index: number) => {
          return (
            <Tabs.TabPane
              tab={<p style={{ margin: "0.25rem" }}>{file?.filename}</p>}
              key={index}
            >
              <Row gutter={[10, 10]}>
                <Col span={5} style={{ color: "#083263" }}>
                  <p>Status</p>
                </Col>
                <Col span={2}>{" : "}</Col>
                <Col span={17} style={{ color: "#1890ff" }}>
                  <p style={{ paddingLeft: "0.5rem" }}>
                    {file?.status.toUpperCase()}
                  </p>
                </Col>
              </Row>
              <Row gutter={[10, 10]}>
                <Col span={5} style={{ color: "#083263" }}>
                  <p>Patch</p>
                </Col>
                <Col span={2}>{" : "}</Col>
                <Col span={17}>
                  <CodeBlock
                    text={file?.patch}
                    language="javascript"
                    theme={github}
                    showLineNumbers={true}
                  />
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
