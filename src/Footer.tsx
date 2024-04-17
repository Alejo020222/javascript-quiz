import { Button } from "@mui/material";
import { unserQuestionData } from "./hook/useQuestionsData";
import { useQuestionStore } from "./store/quetions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = unserQuestionData();

  const reset = useQuestionStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={() => reset()}>Resetear juego</Button>
      </div>
    </footer>
  );
};
