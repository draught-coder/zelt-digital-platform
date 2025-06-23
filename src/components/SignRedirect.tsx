import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const DOCUSEAL_BASE_URL = 'https://sign.app.ibnzelt.com';

const SignRedirect: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (submissionId) {
      // Optionally, you can validate the email param here
      const docuSealUrl = `${DOCUSEAL_BASE_URL}/s/${submissionId}`;
      window.location.replace(docuSealUrl);
    }
  }, [submissionId]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
      <h2 className="text-2xl font-semibold mb-2">Redirecting to secure signing page…</h2>
      <p className="text-muted-foreground">If you are not redirected, <a href={`https://sign.app.ibnzelt.com/s/${submissionId}`} className="text-blue-600 underline">click here</a>.</p>
    </div>
  );
};

export default SignRedirect; 