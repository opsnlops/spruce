import { Skeleton } from "antd";
import {
  PageContent,
  PageLayout,
  PageSider,
  PageWrapper,
  SiderCard,
} from "components/styles";

export const PatchAndTaskFullPageLoad: React.VFC = () => (
  <PageWrapper>
    <Skeleton active paragraph />
    <PageLayout>
      <PageSider>
        <SiderCard>
          <Skeleton active title={false} paragraph={{ rows: 4 }} />
        </SiderCard>
        <SiderCard>
          <Skeleton active title={false} paragraph={{ rows: 4 }} />
        </SiderCard>
      </PageSider>
      <PageLayout>
        <PageContent>
          <Skeleton active title paragraph={{ rows: 8 }} />
        </PageContent>
      </PageLayout>
    </PageLayout>
  </PageWrapper>
);
