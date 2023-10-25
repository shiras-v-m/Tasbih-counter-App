import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import AnimatedNumbers from "react-animated-numbers";


function App() {
  const [languageChoosen, setLanguageChoose] = useState('English')
  const [choosenId, setChoosenId] = useState('')
  const [languageOptionsopened, setLanguageOptionOpened] = useState(false)
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [num, setNum] = React.useState(0);

  // add form 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const value = (index) => {
    const updatedData = [...data];
    // Set the state with the updated array

    setNum(updatedData[index].count)
  }

  const reset = (index) => {
    const updatedData = [...data];
    // Set the state with the updated array
    updatedData[index].count = 0;
    setNum(updatedData[index].count)
  }


  const incrementValue = (index) => {
    // Create a copy of the data array
    const updatedData = [...data];

    // if (index !== -1) {
    console.log("got index ", index);
    // Update the property of the object


    if (updatedData[index] == undefined || !languageChoosen) {
      return alert("please enter an option")
    }
    updatedData[index].count += 1;

    // Set the state with the updated array
    setData(updatedData);
    setNum(updatedData[index].count)
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("helo");
    if (title.trim() == '') {
      return alert("Please enter a title")
    }
    if (title.trim().length > 13) {
      return alert("Please shorten the string")
    }
    handleClose()
    const countData = {
      title: title.trim(),
      count: 0,
      selected: false,
      // date:new Date()
    }
    setData([...data, countData])
  }

  const handleDelete = (index) => {
    // alert("delete clicked")
    console.log(index);
    data.splice(index, 1)

    setData([...data])
    setChoosenId('')

  }

  function DropdownItem(props) {
    return (
      <li className='dropdownItem'>
        <div className='dropdownItemContentContainer' onClick={(e) => {
          e.preventDefault()
          setLanguageChoose(props.text)
          setChoosenId(props.index)
          value(props.index)
        }}>
          <a href="" >{props.text}</a>
          {props.text === languageChoosen && <span className="material-symbols-outlined" style={{ color: 'red' }}>done</span>}
          <span className="material-symbols-outlined" style={{ color: 'red' }} onClick={() => handleDelete(props.index)}>delete</span>
        </div>

      </li>
    )
  }

  console.log(languageChoosen);
  console.log(choosenId);
  console.log(data);
  return (
    <>
      <div className="counterFrame">
        <div className="counterUpperStrap">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
        <div className="counterHead">
          <div className="display">
            <AnimatedNumbers className='digits'
              animateToNumber={num}
              fontStyle={{ fontSize: 30 }}
              configs={(number, index) => {
                return { mass: 1, tension: 2000 * (index + 1), friction: 100 };
              }}
            ></AnimatedNumbers>
          </div>
          
          <div className="buttons">
            <button className='incrementBtn' onClick={() => {
              incrementValue(choosenId)
            }}></button>
            <button className='resetBtn' onClick={() => {
              reset(choosenId)
            }}></button>
            {/* <button onClick={() => setNum((state) => state>0 && state - 1)}>-</button> */}
            <div className='dropDown'><div className="languageBox">

              {<span onClick={() => setLanguageOptionOpened(!languageOptionsopened)} className={`material-symbols-outlined ${languageOptionsopened ? 'upArrowIcon' : 'downArrowIcon'} `}>expand_more</span>}

              {languageOptionsopened && <div className="dropdownMenu">
                <ul>
                  {
                    data.map((item, index) => (
                      <>
                        <DropdownItem key={index} img={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} text={item.title} index={index} />
                        {/* <DropdownItem img={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} text={'हिंदी'}  /> */}
                      </>
                    ))
                  }
                  <Button onClick={handleShow} variant="primary">Add
                    <span className="material-symbols-outlined addIcon">add</span></Button>{' '}
                </ul>
              </div>}
            </div></div>
          </div>
        </div>
        <div className="counterBottomStrap">
          <div className="holeConnect"></div>
          <div className="holeConnect"></div>
          <div className="holeConnect"></div>
        </div>

      </div>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit} >
          <Modal.Header closeButton>
            <Modal.Title>Enter the title</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Title here..." required onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='input'>
              Save Changes
            </Button>
          </Modal.Footer>

        </form>
      </Modal>
      <div className="copyright">
        <p className='copyrightTxt'>Made with ❤️ Shiras VM</p>
      </div>
    </>
  )
}

export default App
