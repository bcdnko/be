import { StandardLayout } from '../templates/StandardLayout';
import { PageHeader } from '../atoms/PageHeader';
import { TakeMeHomeButton } from '../atoms/buttons/TakeMeHome';
import { ReportIssueButton } from '../atoms/buttons/ReportIssue';

export function ErrorPage() {
  return (<StandardLayout>
    {{
      main: (
        <>
          <div style={{ textAlign: 'center' }}>
            <PageHeader>Something Went Wrong</PageHeader>
            <p>Oops! We are so sorry but we can't process your request right now due to an error.<br /> Please come back later.</p>
            <div>
              <TakeMeHomeButton />
              <ReportIssueButton />
            </div>
          </div>
        </>
      ),
    }}
  </StandardLayout>);
}
