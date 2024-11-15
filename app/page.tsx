'use client';

import { useState } from 'react';

// Define types for the quiz questions
type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

// Static array of quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctAnswer: 'Pacific',
  },
];

const QuizPage = () => {
  // შექმენით 3 ცვლადი და მიანიჭეთ მათ შესაბამისი საწყისი მნიშვნელობები

  // პირველი ცვლადი :  - მიმდინარე კითხვის ინდექსი (რომ გავიგოთ მერამდენე კითცვაზეა მომხმარებელი)

  // მეორე ცლვადი: score - მომხმარებლის ქულა, სამომავლოდ დავუმატებთ ერთს თუ სწორი იქნება,

  // მესამე ცვლადი : isCompleted - ქვიზის დასრულების სტატუსი (რომ გავიგოთ მართლა დასრულდა თუ არა ქვიზი)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isCompleted, setIsComplated] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption: string): void => {
    console.log(selectedOption);
    // ამჟამინდელი კითხვის შენახვა

    // შევამოწმოთ სწორი არის თუ არა კითხვა რომელიც მომხარებელმა აირჩია

    // გადავიყვანოთ შემდეგ კითხვაზე და თუ კითხვა ბოლოა დავასრულოთ ქვიზი

    const Answer = quizQuestions[currentQuestion].correctAnswer;

    if (Answer === selectedOption) {
      setScore((perv) => perv + 1);
    }

    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  };

  // შექმენით ფუნქცია რომელიც განაახლებს ქვიზის სტატუსს და დასრულებს ქვიზს
  const restartQuiz = (): void => {
    if (quizQuestions.length === currentQuestion) {
      setIsComplated(true);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md text-center'>
        {/* თუ შესრულებულია გამოჩდეს ეს  */}
        {isCompleted && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Quiz Completed!</h1>
            <p className='text-lg mb-6'>
              Your Score:{' '}
              <span className='font-semibold'> Dynamic Score Here</span> /{' '}
              {quizQuestions.length}
            </p>
            <button
              onClick={restartQuiz}
              className='bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition'
            >
              Restart Quiz
            </button>
          </>
        )}
        {/* თუ ქვიზი მიმდინარეობს გამოჩნდეს ეს */}
        {!isCompleted && (
          <>
            <p className='text-gray-600 mb-4'>
              Question {score} of {quizQuestions.length}
            </p>
            <h1 className='text-2xl font-bold mb-4'>
              "ქვიზიდან კითხვა გამოჩნდეს აქ"
            </h1>
            <div className='space-y-4'>
              {/* აქ სტატიკურად  ინდექსად 0 ელემენტის 4 კითხვა იმაპება ჩვენ გვინდა ყოველ შემდეგ კითხვაზე ახლიდან დაიმაპოს*/}
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className='block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition'
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
