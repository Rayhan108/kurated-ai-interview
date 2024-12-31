"use client";
import MySectionTitle from "@/components/shared/common/my-section-title";
import MySpacer from "@/components/shared/common/my-spacer";
import { RightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

export default function SupportPage() {
  const supportItems = [
    {
      key: "1",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          This is panel header 1
        </p>
      ),
      children: <p>{"text"}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "2",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          This is panel header 1
        </p>
      ),
      children: <p>{"text"}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
  ];
  const feedbackItems = [
    {
      key: "1",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          This is panel header 1
        </p>
      ),
      children: <p>{"text"}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "2",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          This is panel header 1
        </p>
      ),
      children: <p>{"text"}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
  ];

  return (
    <div>
      <MySectionTitle title="FAQs" className="font-bold text-xl" />

      <MySpacer className="h-10" />
      <div>
        <p className="text-sm font-semibold pb-3">
          Technical Support and Troubleshooting:
        </p>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <RightOutlined
              size={30}
              rotate={isActive ? 90 : 0}
              className={`p-2 rounded-full ${
                isActive
                  ? "bg-primaryColor text-white"
                  : "bg-white text-primaryColor "
              }`}
            />
          )}
          items={supportItems}
          style={{ background: "transparent" }}
        />
      </div>

      <MySpacer className="h-10" />
      <div>
        <p className="text-sm font-semibold pb-3">Feedback and Community:</p>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <RightOutlined
              size={30}
              rotate={isActive ? 90 : 0}
              className={`p-2 rounded-full ${
                isActive
                  ? "bg-primaryColor text-white"
                  : "bg-white text-primaryColor "
              }`}
            />
          )}
          items={feedbackItems}
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
}
