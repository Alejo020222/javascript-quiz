// import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JavaScriptLogo } from "./assets/JavaScriptLogo";
import { Start } from "./Start";
import { Game } from "./Game";
import { useQuestionStore } from "./store/quetions";

function App() {
  const question = useQuestionStore((state) => state.question);
  // const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  // console.log(question, currentQuestion);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>
        {question.length === 0 ? <Start /> : <Game />}
      </Container>
    </main>
  );
}

export default App;
