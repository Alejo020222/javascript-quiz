import { Button } from "@mui/material";
import { useQuestionStore } from "./store/quetions";

export const Start = () => {
  const LIMIT_QUESTIONS = 10;

  const fetchQuestions = useQuestionStore((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Empezar!!!
    </Button>
  );
};
