import React from 'react';
import { Popover } from 'react-bootstrap';

const Tuition = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Tuition Range</Popover.Title>
      <Popover.Content>
        Filter results based on a tuition range.
        <br/>
        <br/>
        Example: 10000 for lower bound, 20000 for upper bound will return all colleges that are between $10,000 and $20,000 for tuition.
      </Popover.Content>
    </Popover>
  );

  const Rankings = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Ranking Range</Popover.Title>
      <Popover.Content>
        Filter results based on national rankings.
        <br/>
        <br/>
        Example: 10 for lower bound, 1 for upper bound will return all colleges between 1 - 10 in national ranking.
        <br />
        <br />
        Example: 10 for lower bound, and no input for upper bound will also return all colleges between 1 - 10 in national ranking.
        <br/>
        <br/>
        All rankings come from <a href="https://www.usnews.com/best-colleges" target="_blank">usnews.com</a> 
      </Popover.Content>
    </Popover>
  );

  const AppFee = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Application Fee Range</Popover.Title>
      <Popover.Content>
        Filter results based on application fees.
          <br/>
          <br/>
        Example: 20 for lower bound, 50 for upper bound will return all colleges between $20 - $50 in national ranking.
      </Popover.Content>
    </Popover>
  );

  const AcceptanceRate = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Acceptance Rate Range</Popover.Title>
      <Popover.Content>
        Filter results based on acceptance rates. The field also takes decimal values. 
          <br />
        Ex) 10.3, 20.75, 75.231
          <br/>
          <br/>
        Example: 20 for lower bound, 50 for upper bound will return all colleges that have acceptance rates between 20% - 50%.
      </Popover.Content>
    </Popover>
  );

  const Population = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Population Range</Popover.Title>
      <Popover.Content>
        Filter results based on total undergraduate population of the university.  
          <br/>
          <br/>
        Example: 10000 for lower bound, 30000 for upper bound will return all colleges with population sizes between
        10,000 - 30,000.
      </Popover.Content>
    </Popover>
  );

  const AppType = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Application Type</Popover.Title>
      <Popover.Content>
        Select an option from the dropdown to filter by the application type.
          <br/>
          <br/>
        Example: Selecting "Common Application" will return all universities that take applications through the Common Application. Selecting 'Any' will return all colleges.
      </Popover.Content>
    </Popover>
  );

  const SchoolType = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">School Type</Popover.Title>
      <Popover.Content>
        Select an option from the dropdown to filter by school type, which is either private or public.
          <br/>
          <br/>
        Example: Selecting "Private" will return all private universities. Selecting 'Any' will return all colleges.
      </Popover.Content>
    </Popover>
  );

  const LetterRec = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Letter of Recommendations</Popover.Title>
      <Popover.Content>
        Filter results based on the number of letters of recommendations needed.
          <br/>
          <br/>
        Example: Selecting "2" will return all universities that require two letters of recommendation. Selecting 'Any' will return all colleges.
      </Popover.Content>
    </Popover>
  );

  const StateList = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">States</Popover.Title>
      <Popover.Content>
        Filter results based on the state a college is in.
          <br/>
          <br/>
        Example: Selecting "CA", "NY", "AL" will return all universities that are in California, New York, and Alabama. Selecting no options will return all colleges.
      </Popover.Content>
    </Popover>
  );

  const SATScoreList = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">SAT Average Score</Popover.Title>
      <Popover.Content>
        Filter results based on the average SAT Scores for all accepted students at each college.
          <br/>
          <br/>
        The slider starts at 0 and is capped at 1600. Dragging the slider will change the numbers above, 
        showing you what your lower bound and upper bound is.
          <br/>
          <br/>
        For Example, if the number display is "900 - 1200", it will return Schools with average SAT score accepted between
        900 and 1200
          <br/>
      </Popover.Content>
    </Popover>
  );

  const ACTScoreList = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">ACT Average Score</Popover.Title>
      <Popover.Content>
      Filter results based on the average ACT Scores for all accepted students at each college.
          <br/>
          <br/>
          The slider starts at 0 and is capped at 36. Dragging the slider will change the numbers above, 
          showing you what your lower bound and upper bound is.          
          <br/>
          <br/>
          For Example, if the number display is "15 - 25", it will return Schools with average ACT score accepted between
          15 and 25
          <br/>
      </Popover.Content>
    </Popover>
  );

  const Common = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Note</Popover.Title>
      <Popover.Content>
        You have selected colleges for which the Common Application will suffice and the Coalition Application is <b>not</b> required.
        <br />
        <br />
        Some of your colleges also accept the Coalition Application, so these prompts are also visible but they do not count towards the number of required prompt(s).
      </Popover.Content>
    </Popover>
  );

  const Coalition = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Note</Popover.Title>
      <Popover.Content>
        You have selected colleges for which the Coalition Application will suffice and the Common Application is <b>not</b> required. 
        <br />
        <br />
        Some of your colleges also accept the Common Application, so these prompts are also visible but they do not count towards the number of required prompt(s).
      </Popover.Content>
    </Popover>
  );

  export {
      Tuition,
      Rankings,
      AcceptanceRate,
      AppFee,
      Population,
      AppType,
      SchoolType,
      StateList,
      LetterRec,
      ACTScoreList,
      SATScoreList,
      Common,
      Coalition
  }