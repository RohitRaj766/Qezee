import React from 'react'
import './CreateQuiz.scss'

function CreateQuiz() {
  return (
    <div>
        <nav>
            <h1 className='heading'>CREATE QUIZ</h1>
            <a href="#">logout</a>
        </nav>

        <div className='quiz-details'>
            <input type="text" placeholder='Quiz Title' />
            <div className='quiz-time'>
                <input type="text" placeholder='Start Time' />
                <input type="text" placeholder='End Time' />
            </div>
            <div className='date-status'>
                <input type="text" name="" id="" placeholder='Date' />
                <input type="text" name="" id="" placeholder='Quiz Status' />
            </div>
        </div>

        <div className='question-container'>
            <input type="text" className='question' placeholder='Question'/>
            <div className='answers'>
                <input type="text" className='option1' placeholder='option 1'/>
                <input type="text" className='option2' placeholder='option 2'/>
                <input type="text" className='option3' placeholder='option 3'/>
                <input type="text" className='option4' placeholder='option 4'/>
            </div>
            <button>Add Questions</button>
            <button>Upload</button>
        </div>
    </div>
  )
}

export default CreateQuiz