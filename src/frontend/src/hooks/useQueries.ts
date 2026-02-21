import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetScore(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['score', id.toString()],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getScore(id);
    },
    enabled: !!actor && !isFetching,
  });
}
