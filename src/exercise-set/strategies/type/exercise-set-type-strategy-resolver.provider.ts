import { Injectable } from "@nestjs/common";
import { MCQTypeStrategyProvider } from "src/exercise-set/strategies/type/mcq-type.strategy.provider";
import { OpenEndedTypeStrategyProvider } from "src/exercise-set/strategies/type/open-ended-type.strategy.provider";
import { ShortTypeStrategyProvider } from "src/exercise-set/strategies/type/short-type.strategy.provider";
import { TrueFalseTypeStrategyProvider } from "src/exercise-set/strategies/type/true-false-type.strategy.provider";
import { ResolveTypeStrategyProviderResponse } from "src/exercise-set/types/response/resolve-type-strategy-provider.response";
import { ExerciseSetTypeStrategy } from "src/exercise-set/types/strategy/exercise-set-type.strategy.interface";

@Injectable()
export class ExerciseSetTypeStrategyResolverProvider {
    private readonly strategyMap: Map<string, ExerciseSetTypeStrategy>;

    constructor(
        private mcqTypeStrategy: MCQTypeStrategyProvider,
        private trueFalseTypeStrategy: TrueFalseTypeStrategyProvider,
        private openEndedTypeStrategy: OpenEndedTypeStrategyProvider,
        private shortTypeStrategy: ShortTypeStrategyProvider,
    ) {
        this.strategyMap = new Map<string, ExerciseSetTypeStrategy>([
            ['mcq', this.mcqTypeStrategy],
            ['trueFalse', this.trueFalseTypeStrategy],
            ['openEnded', this.openEndedTypeStrategy],
            ['short', this.shortTypeStrategy],
        ]);
    }

    resolveTypeStrategyProvider(type: string): ResolveTypeStrategyProviderResponse {
        const strategy = this.strategyMap.get(type);
        if (strategy) {
            return { isSuccess: true, message: "strategy is resolved", strategy };
        }
        return { isSuccess: false, message: "couldn't resolved" };
    }
}
