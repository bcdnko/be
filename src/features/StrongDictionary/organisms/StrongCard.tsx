import React  from 'react';
import { Placeholder } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { fetchStrongWord } from '../../../core/api/strong';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';

function Skeleton() {
  return (
    <Placeholder animation="glow">
      <p><Placeholder xs={12} /></p>
      {Array(10).fill(1).map((v, i) =>
        <div key={i}><Placeholder xs={12} /></div>
      )}
    </Placeholder>
  );
}

type Props = {
  strongId: string,
}

export const StrongCard: React.FC<Props> = ({
  strongId,
}) => {
  const { settings } = useSettingsContext();
  const dictionaryId = settings.chapter.defaultDictionaryId;

  const query = useQuery(
    [dictionaryId, strongId],
    () => fetchStrongWord(dictionaryId, strongId)
  );

  const cardContent = () => {
    if (query.isLoading) {
      return <Skeleton />;
    }

    if (query.data) {
      const strong = query.data;

      return <>
        <h3 className="card-title">{strong.id} {strong.word}</h3>
        <div dangerouslySetInnerHTML={{__html: strong.meaning}}></div>
      </>
    }

    return <>Something went wrong</>;
  };

  return (
    <div className="card" style={{
      boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.1)',
    }}>
      <div className="card-header">Strong's Dictionary</div>
      <div className="card-body">
        {cardContent()}
      </div>
    </div>
  );
}
