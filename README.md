# Lectry
**Lect**ure **R**eact **Y**outube is a tool to couple lecture questions with a lecture video hosted on Youtube.  
This won 3rd place at the Xtern 2016 Hackathon.  
[Demo](https://lectry.herokuapp.com/#/)

# How to Format Questions:

```javascript
  {
    type: "multiple choice",                            // format of the question
    question: "What is a good example of a function?",  // question text
    qid: 1,                                             // a unique identifier for the question
    answers: [
      "Only adding 1 + 1",
      "Returning 1 when called", 
      "Adding some numbers 'a' and 'b'", 
      "Functions are useless"
    ],                                                   // options for a particular question
    time: 43                                             // time in seconds that the quesiton will appear
  }
```
Questions are formatted are expected to come in as an array of objects shown above. Currently supported is multiple choice; however, adding more question types is as easy as adding a case statement to [QuestionPanel](https://github.com/lamdaV/lectry/blob/master/src/components/QuestionPanel.jsx) and create the appropriate component (see [MultiQuestion](https://github.com/lamdaV/lectry/blob/master/src/components/MultiQuestion.jsx) for an example). 

# Known Bugs:
React Keys, despite using a node package to uniquely generate keys, still warns that keys are potentially unique.
