import ComponentCard from "../../components/common/ComponentCard";
import Alert from "../../components/ui/alert/Alert";
import PageLayout from "../../components/common/PageLayout";

export default function Alerts() {
  return (
    <PageLayout
      title="React.js Alerts Dashboard | TailAdmin - React.js Admin Dashboard Template"
      description="This is React.js Alerts Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
    >
      <ComponentCard title="Success Alert">
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          showLink={true}
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          showLink={false}
        />
      </ComponentCard>
      <ComponentCard title="Warning Alert">
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
          showLink={true}
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
          showLink={false}
        />
      </ComponentCard>
      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Error Message"
          message="Be cautious when performing this action."
          showLink={true}
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="error"
          title="Error Message"
          message="Be cautious when performing this action."
          showLink={false}
        />
      </ComponentCard>
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Info Message"
          message="Be cautious when performing this action."
          showLink={true}
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="info"
          title="Info Message"
          message="Be cautious when performing this action."
          showLink={false}
        />
      </ComponentCard>
    </PageLayout>
  );
}
