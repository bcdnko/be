import { TextPageLayout } from '../templates/TextPageLayout';
import { PageHeader } from '../atoms/PageHeader';
import { TakeMeHomeButton } from '../atoms/buttons/TakeMeHome';
import { ReportIssueButton } from '../atoms/buttons/ReportIssue';

export function NotFoundPage() {
  return (
    <TextPageLayout>
      {{
        main: (
          <>
            <div style={{ textAlign: 'center' }}>
              <PageHeader>Page Not Found</PageHeader>
              <p>
                We couldn't find the page you requested, but we can still help
                you to find <strong>GOD</strong>!
              </p>
              <div>
                <TakeMeHomeButton />
                <ReportIssueButton />
              </div>
            </div>
          </>
        ),
      }}
    </TextPageLayout>
  );
}
