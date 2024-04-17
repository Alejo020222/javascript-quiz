import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  question: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNexCuestio: () => void;
  goPreviusQuestion: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => {
      return {
        question: [],
        currentQuestion: 0,

        fetchQuestion: async (limit: number) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();
          const question = json.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ question });
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          //para poder acceder a la propiedad question del estado global
          const { question } = get();
          //structuredClone para clonar todo el objeto
          const newQuestions = structuredClone(question);
          //buscar la respuesta por el indice en el arreglo clonado
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          //guardar la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex];
          //averiguar si el usuario ha seleccionado la reespuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          //si es correta la pregunta confetti
          if (isCorrectUserAnswer) confetti();
          //cambiar esta informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          set({ question: newQuestions });
        },
        goPreviusQuestion: () => {
          const { currentQuestion, question } = get();
          const previusQuestion = currentQuestion - 1;
          if (previusQuestion < question.length) {
            set({ currentQuestion: previusQuestion });
          }
        },
        goNexCuestio: () => {
          const { currentQuestion, question } = get();
          const nexCuestion = currentQuestion + 1;
          if (nexCuestion < question.length) {
            set({ currentQuestion: nexCuestion });
          }
        },
      };
    },
    {
      name: "questions",
    }
  )
);
