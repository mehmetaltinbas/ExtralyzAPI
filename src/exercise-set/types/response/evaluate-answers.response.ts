import ResponseBase from 'src/shared/interfaces/response-base.interface';

export interface ExerciseAnswerEvaluationResult {
    exerciseId: string;
    exerciseType: string;
    userAnswer: string;
    solution: string;
    correctChoiceIndex: number;
    score: number;
    feedback: string;
}

export interface EvaluateAnswersResponse extends ResponseBase {
    overallScore: number;
    exerciseAnswerEvaluationResults: ExerciseAnswerEvaluationResult[];
}
