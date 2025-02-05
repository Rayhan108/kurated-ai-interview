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
          What topics does Kurated Storylining cover?
        </p>
      ),
      children: <p>{"Kurated Storylining focuses on teaching structured storytelling techniques to help you communicate ideas clearly and effectively. The course covers three core tools: Headline, Vertical Logic, and Horizontal Logic, along with practical exercises to apply these concepts in presentations, narratives, and other communication formats."}</p>,
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
          Who is the intended audience for this course?
        </p>
      ),
      children: <p>{"Kurated Storylining is designed for professionals, business leaders, consultants, educators, students, and anyone looking to improve their storytelling and presentation skills. Whether you're a beginner or an experienced storyteller, the course adapts to your skill level."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "3",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How long does it take to complete the Kurated Storylining course?
        </p>
      ),
      children: <p>{"The three core tools are: Headline: Crafting clear, concise, and impactful slide headlines.Vertical Logic: Building a logical flow within each slide.Horizontal Logic: Connecting slides seamlessly to create a compelling narrative."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "4",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Are there real-world examples or case studies included?
        </p>
      ),
      children: <p>{"The course features real-world case studies and data sets, allowing you to apply storytelling techniques in practical scenarios."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "5",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Does the course include interactive elements?
        </p>
      ),
      children: <p>{"Yes! Kurated Storylining includes video lessons, interactive exercises, and guided practice to help reinforce learning."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "6",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Is this course industry-specific?
        </p>
      ),
      children: <p>{"No, Kurated Storylining is designed to be industry-agnostic and applies to anyone who wants to enhance their storytelling and presentation skills."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "7",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I access the course on mobile devices and tablets?
        </p>
      ),
      children: <p>{"We recommend accessing the platform using a desktop or laptop for the best experience."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "8",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I download course content for offline access?
        </p>
      ),
      children: <p>{"No, you need an active internet connection to access and progress through the course."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "9",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Are there system or software requirements for using the Kurated platform?
        </p>
      ),
      children: <p>{"We recommend learners access Kurated online through Chrome, Arc, Safari, or Firefox browsers."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "10",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How do I track my progress through the course?
        </p>
      ),
      children: <p>{"The Kurated platform automatically tracks your progress as you complete lessons, exercises, and modules. You can view your progress on your dashboard."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "11",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How often is content updated?
        </p>
      ),
      children: <p>{"Content is updated periodically to reflect the latest storytelling techniques and user feedback. We also plan to add new modules and tools in the future."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "12",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I share or download course content?
        </p>
      ),
      children: <p>{"We do not authorize the sharing of content with others. Subject to your payment of any applicable fees, Kurated grants you a non-transferable, royalty- free license, to access and use any Kurated content you purchase through the Services, without the right to sublicense. You may only use the content for your own personal, non-commercial purposes, and you may not (a) reproduce, modify, translate or create any derivative work of the content; (b) sell, share, rent, lease, loan, provide, distribute or otherwise transfer the content; (c) circumvent any security measures or attempt to gain access to content that you have not paid for; or (d) permit or encourage any third party to do any of the foregoing You are responsible for complying with any license terms that accompany such content."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "13",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I revisit and retry exercises?
        </p>
      ),
      children: <p>{"Yes, you can revisit and retry exercises anytime to reinforce your learning."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "14",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How does the course structure work?
        </p>
      ),
      children: <p>{"The course begins with short instructional videos, followed by exercises that increase in difficulty as you progress"}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "15",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Do you provide feedback on my work?
        </p>
      ),
      children: <p>{"The course includes interactive elements and self-assessment tools to help you gauge your progress. Additionally, you can schedule a 30 minutes 1:1 session with experts at an additional $99 per session."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "16",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Is there a community or forum for learners?
        </p>
      ),
      children: <p>{"Currently, Kurated does not have a community forum, but we are exploring options to add this feature in the future."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "17",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How can I get help if I have questions about the course?
        </p>
      ),
      children: <p>{"For support, email us at team@kurated.ai, and our team will assist you."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "18",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          What if I encounter technical issues while using the platform?
        </p>
      ),
      children: <p>{"Our technical support team is available to assist you with any issues. Please contact our support team through the platform or via email."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "19",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How do I create an account?
        </p>
      ),
      children: <p>{"You can create an account with Kurated for free by signing up on our website."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "20",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          What should I do if I forget my login information?
        </p>
      ),
      children: <p>{"The login page provides an option to reset your password. You can also click here to retrieve your login details. We also provide SSO (Single Sign-On) options at sign-up to help you connect your Kurated information to one of your primary accounts."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "21",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I change my account details?
        </p>
      ),
      children: <p>{"Yes, you can update your account details in the Accounts page after logging in."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "22",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Do I receive any proof of course completion?
        </p>
      ),
      children: <p>{"You have the option to receive an official LinkedIn Certificate upon Completing any Kurated course."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "23",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I cancel my subscription?
        </p>
      ),
      children: <p>{"You can cancel auto renewal of your subscription on the Profile-> Account Settings page-> Subscription section of your account at any time and you will continue to enjoy unlimited access to the product until the end of your subscription period. A refund will be issued if the request is made within 1 week of purchase, in which case your subscription will not renew, and you will not be charged again unless you purchase another subscription."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "24",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I still log in to Kurated after my subscription ends?
        </p>
      ),
      children: <p>{"Yes, you can log in to view your course history, but you will no longer have access to paid content after your subscription expires."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "25",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How can I delete my account?
        </p>
      ),
      children: <p>{"To delete your account, email us at team@kurated.ai, and we will process your request immediately."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "26",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How much does Kurated Storylining cost?
        </p>
      ),
      children: <p>{"Access to Kurated Storylining is subscription-based. Pricing details can be found on the Pricing page."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "27",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Are there any discounts or scholarships available?
        </p>
      ),
      children: <p>{"Follow us on social media to look out for future product launches, promotions, and discounts. You can also check with your university to see if they sponsor e-learning tools like Kurated Storylining."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "28",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          What forms of payment do you accept?
        </p>
      ),
      children: <p>{"We accept payments via debit or credit cards using Stripe."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "29",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Is there a refund policy if I'm not satisfied with the course?
        </p>
      ),
      children: <p>{"Refund requests are evaluated individually and must be received within 7 days of purchase. If you’re dissatisfied with your purchase, please reach out to us at team@kurated.ai. Refund requests are evaluated individually."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "30",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How do you protect my personal information?
        </p>
      ),
      children: <p>{"Kurated uses advanced encryption to secure your personal information, which is only accessible when logged into your account."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "31",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          What is your privacy policy?
        </p>
      ),
      children: <p>{"You can review our Privacy Policy here."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "32",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can I delete my account and data?
        </p>
      ),
      children: <p>{"Yes, email us at team@kurated.ai to request account and data deletion."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "33",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          What are the terms of service for using the e-learning platform?
        </p>
      ),
      children: <p>{"You can access our Terms and Conditions here."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "34",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          How will Kurated Storylining improve my storytelling skills?
        </p>
      ),
      children: <p>{"By mastering the three core tools (Headline, Vertical Logic, and Horizontal Logic), you'll be able to create more impactful presentations and communicate complex ideas more effectively."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "35",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Can Kurated Storylining help with specific types of presentations?
        </p>
      ),
      children: <p>{"Yes, the skills learned in Kurated Storylining can be applied to various types of presentations, including business pitches, academic presentations, and creative storytelling."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },
    {
      key: "36",
      label: (
        <p className="font-semibold text-gray-600 text-base">
          Is the course suitable for team training?
        </p>
      ),
      children: <p>{"Yes, Kurated Storylining can be an excellent tool for team training, helping to standardize and improve communication skills across your organization."}</p>,
      style: {
        border: "none",
        background: "#F5F6F8",
        marginBottom: "20px",
        borderRadius: "10px",
      },
    },

  ];


  // const feedbackItems = [
  //   {
  //     key: "1",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         This is panel header 1
  //       </p>
  //     ),
  //     children: <p>{"text"}</p>,
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         This is panel header 1
  //       </p>
  //     ),
  //     children: <p>{"text"}</p>,
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  // ];

  // const supportItems = [
  //   {
  //     key: "1",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         How can I get help if I have questions about the course?
  //       </p>
  //     ),
  //     children: (
  //       <p>
  //         For support, email us at <a href="mailto:team@kurated.ai" className="text-blue-500">team@kurated.ai</a>, and our team will assist you.
  //       </p>
  //     ),
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         What if I encounter technical issues while using the platform?
  //       </p>
  //     ),
  //     children: (
  //       <p>
  //         Our technical support team is available to assist you with any issues. Please contact our support team through the platform or via email at <a href="mailto:team@kurated.ai" className="text-blue-500">team@kurated.ai</a>.
  //       </p>
  //     ),
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  // ];

  // const feedbackItems = [
  //   {
  //     key: "1",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         Do you provide feedback on my work?
  //       </p>
  //     ),
  //     children: (
  //       <p>
  //         The course includes interactive elements and self-assessment tools to help you gauge your progress. Additionally, you can schedule a 30-minute 1:1 session with experts at an additional $99 per session.
  //       </p>
  //     ),
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <p className="font-semibold text-gray-600 text-base">
  //         Can I revisit and retry exercises?
  //       </p>
  //     ),
  //     children: (
  //       <p>
  //         Yes, you can revisit and retry exercises anytime to reinforce your learning.
  //       </p>
  //     ),
  //     style: {
  //       border: "none",
  //       background: "#F5F6F8",
  //       marginBottom: "20px",
  //       borderRadius: "10px",
  //     },
  //   },
  // ];



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
              className={`p-2 rounded-full ${isActive
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
      {/* <div>
        <p className="text-sm font-semibold pb-3">Feedback and Community:</p>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <RightOutlined
              size={30}
              rotate={isActive ? 90 : 0}
              className={`p-2 rounded-full ${isActive
                ? "bg-primaryColor text-white"
                : "bg-white text-primaryColor "
                }`}
            />
          )}
          // items={feedbackItems}
          style={{ background: "transparent" }}
        />
      </div> */}
    </div>
  );
}
