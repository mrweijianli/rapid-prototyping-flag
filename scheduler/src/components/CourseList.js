import 'rbx/index.css';
import { Button } from 'rbx';
import React, { useState } from 'react';
import db from '../App';
import Course from './Course';
import { terms, buttonColor, getCourseTerm } from './Course';


const useSelection = () => {
    const [selected, setSelected] = useState([]);
    const toggle = (x) => {
      setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
    };
    return [ selected, toggle ];
  };

const TermSelector = ({ state }) => (
    <Button.Group hasAddons>
      {
         Object.values(terms)
              .map(value =>
                <Button key={value}
                  color={ buttonColor(value === state.term) }
                  onClick={ () => state.setTerm(value) }
                  >
                  { value }
                </Button>)
      }
    </Button.Group>
);

const CourseList = ({ courses, user }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, toggle] = useSelection();
    const termCourses = courses.filter(course => term === getCourseTerm(course));
    return (
      <React.Fragment>
      <TermSelector state = { { term, setTerm } } />
      <Button.Group>
       { courses.map(course => <Course key={course.id} course={ course }
          state={{ selected, toggle}}
          user={ user }
          />)}
      </Button.Group>
      </React.Fragment>
      );
  };

export default CourseList;
