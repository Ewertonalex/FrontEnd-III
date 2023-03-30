import React, { useState } from 'react';
import {questions} from './questions';

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState({});
  const [finished, setFinished] = useState(false);

 

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar a resposta correta com base na etapa atual
    const correctAnswer = questions[step - 1].options[0];

    // Verificar se a resposta do usuário está correta
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      // Se estiver correta, adicionar à lista de respostas corretas
      setErrors([]);
      setResults({ ...results, [step]: 'Correta' });
    } else {
      // Se estiver incorreta, adicionar à lista de erros
      setErrors([...errors, `Questão ${step}: resposta incorreta`]);
      setResults({ ...results, [step]: 'Incorreta' });
    }

    // Avançar para a próxima etapa ou finalizar o quiz
    if (step === questions.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
    setAnswer('');
  };

  const handleReset = () => {
    setStep(1);
    setAnswer('');
    setErrors([]);
    setResults({});
    setFinished(false);
  };

  return (
    <div>
      {!finished && (
        <div>
          <h2>Questão {step}</h2>
          <form onSubmit={handleSubmit}>
            <p>{questions[step - 1].question}</p>
            {questions[step - 1].options.map((option, index) => (
              <label key={index}>
                <input type="radio" value={option} checked={answer === option} onChange={handleAnswer} />
                {option}
              </label>
            ))}
            <br />
            <button type="submit">{step === questions.length ? 'Finalizar' : 'Próxima Questão'}</button>
          </form>
        </div>
      )}

      {finished && (
        <div>
          <h2>Resultado</h2>
          {questions.map((question, index) => (
            <p key={index}>
              Questão {index + 1}: {results[index + 1]}
            </p>
          ))}
          {errors.length > 0 && (
            <div>
              <h3>Erros:</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <br />
          <button onClick={handleReset}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;