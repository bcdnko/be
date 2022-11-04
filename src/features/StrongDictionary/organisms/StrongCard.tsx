import React  from 'react';
import { useQuery } from 'react-query';
import { fetchStrongWord } from '../../../core/api/strong';

type Props = {
  strongId: string,
}

export const StrongCard: React.FC<Props> = ({
  strongId,
}) => {
  const dictionaryId = 'mb-strong-ru';
  const query = useQuery(
    [dictionaryId, strongId],
    () => fetchStrongWord(dictionaryId, strongId)
  );

  if (query.isLoading) {
    return <>Loading...</>;
  }

  if (query.data) {
    const strong = query.data;

    return <>
      <p><strong>{strong.id}</strong> - {strong.word}</p>
      <p dangerouslySetInnerHTML={{__html: strong.meaning}}></p>
    </>
  }

  return <>Something went wrong</>;
}
