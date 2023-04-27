import PageLayout from "./layout/PageLayout";



export default function Pricing() {

  return (
    <PageLayout title={"Pricing"}>
        <stripe-pricing-table pricing-table-id="prctbl_1N1bmVKpaH2wiwbEVmGAmV1Z"
        publishable-key="pk_test_51N0LFTKpaH2wiwbEKAv4v8a9ii4X8oPcjjzGx3ktJfI0awLUTNFrBhNweCT4l6YTu7wi0ZcXGbNk3dMW3IpXyClf00vb4vipcr">
        </stripe-pricing-table>
    </PageLayout>
  );
};