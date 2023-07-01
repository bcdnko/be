import React from 'react';
import { CloseButton, Placeholder } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { config } from '../../../config';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { fetchStrongWord } from '../../shared/hooks/data/api/loaders/fetchStrong';

function Skeleton() {
  return (
    <Placeholder animation="glow">
      <p>
        <Placeholder xs={12} />
      </p>
      {Array(10)
        .fill(1)
        .map((v, i) => (
          <div key={i}>
            <Placeholder xs={12} />
          </div>
        ))}
    </Placeholder>
  );
}

type Props = {
  strongId: string;
  setStrongId: (strongId?: string) => void;
};

export const StrongCard: React.FC<Props> = ({ strongId, setStrongId }) => {
  const { settings } = useSettingsContext();
  const dictionaryId =
    settings.general.defaultDictionaryId || config.defaultDictionaryId;

  const query = useQuery([dictionaryId, strongId], () =>
    fetchStrongWord(dictionaryId, strongId)
  );

  const cardContent = () => {
    if (query.isLoading) {
      return <Skeleton />;
    }

    if (query.data) {
      const strong = query.data;

      return (
        <>
          <h3 className="card-title">
            {strong.id} {strong.word}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: strong.meaning }}></div>
        </>
      );
    }

    return <>Something went wrong</>;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.tagName.toLowerCase() !== 'a') {
      return;
    }

    const href = target.getAttribute('href');
    console.log(href && href.substring(0, 2));
    if (!href || href.substring(0, 2) !== 'S:') {
      return;
    }

    e.preventDefault();
    setStrongId(href.substring(2));
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="card-header">
        <span>Strong's Dictionary</span>

        <CloseButton
          className="btn-close float-end"
          onClick={() => setStrongId()}
        />
      </div>
      <div
        className="card-body"
        onClick={handleClick}
      >
        {cardContent()}
      </div>
    </div>
  );
};
