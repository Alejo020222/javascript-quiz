import {
  Card,
  IconButton,
  // IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  // Stack,
  Typography,
} from "@mui/material";
import { useQuestionStore } from "./store/quetions";
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNewSharp, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  //si el usuario no ha seleccionado nada aun
  if (userSelectedAnswer == null) return "trasparent";
  //si ya selecciono pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "trasparent";
  //solucion correcta
  if (index == correctAnswer) return "green";
  //si esta es la solucion de l usuario pero no es correcta
  if (index !== correctAnswer) return "red";
  return "trasparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }}>
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider
            disabled={info.userSelectedAnswer != null}
            sx={{ backgroundColor: getBackgroundColor(info, index) }}
          >
            {/* El index es por lo que estoy listando las respuestas */}
            <ListItemButton onClick={createHandleClick(index)}>
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const question = useQuestionStore((state) => state.question);
  const currtentQuestion = useQuestionStore((state) => state.currentQuestion);
  const goNextCuestion = useQuestionStore((state) => state.goNexCuestio);
  const goPreviusQuestion = useQuestionStore(
    (state) => state.goPreviusQuestion
  );

  const cuestionInfo = question[currtentQuestion];
  console.log(question);

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          onClick={goPreviusQuestion}
          disabled={currtentQuestion === 0}
        >
          <ArrowBackIosNewSharp />
        </IconButton>
        {currtentQuestion + 1} / {question.length}
        <IconButton
          onClick={goNextCuestion}
          disabled={currtentQuestion >= question.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={cuestionInfo} />
      <Footer />
    </>
  );
};
