import { useQuestionStore } from "../store/quetions";

export const unserQuestionData = () => {
  const questions = useQuestionStore((state) => state.question);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  console.log(correct, incorrect, unanswered);
  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });
  return { correct, incorrect, unanswered };
};
