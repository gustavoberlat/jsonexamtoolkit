const jsonfile = require('jsonfile');



function createNewFile(file){

  const obj = []
  jsonfile.writeFile(file, obj, { flag: "wx" }, function (err) {
  if (err) console.error("file already exists")
  })

}


function findAll(file)
{
  const data = jsonfile.readFileSync(file);

  return data;
}



function findById(file, id){
  const data = findAll(file);

  const question = data.find(question => question.id === id);

  return question
}



function findByCategory(file, category){
  const data = findAll(file);

  const question = data.filter(question => question.category === category);

  return question;
}


function addNewQuestion(file, question){

  const data = findAll(file);

  const id = data.length; 

  const newQuestion = question;
  
  newQuestion.id = id; 

  data.push(newQuestion);

  jsonfile.writeFileSync(file, data, {flag: 'w', spaces: 2});

  return question;

}


function verifyAnswer(file, id, answer){

  const question = findById(file, id);
  var isCorrect;

  if(question.correct_choice === answer) isCorrect = true; 

  else isCorrect = false; 

  const correct_choice_text = question.correct_choice; 
  
  return {
    is_correct: isCorrect,
    user_answer: answer,
    correct_answer_item: question.correct_choice,
    correct_answer_text: question[correct_choice_text]
  };

}



const examManager = {
  verifyAnswer, 
  findAll, 
  findById, 
  findByCategory, 
  addNewQuestion
}



module.exports = examManager;
