import { ExerciseSetTypeStrategy } from 'src/exercise-set/types/strategy/exercise-set-type.strategy.interface';
import ResponseBase from 'src/shared/interfaces/response-base.interface';

export interface ResolveTypeStrategyProviderResponse extends ResponseBase {
    strategy?: ExerciseSetTypeStrategy;
}
