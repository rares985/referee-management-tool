import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';


/* eslint-disable */
const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const MatchTable = (props) => {
  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Echipa A</th>
          <th>Echipa B</th>
          <th>A1</th>
          <th>A2</th>
        </tr>
      </thead>
      <tbody>
        {props.matches.map((match, idx) => {
          const matchJson = JSON.parse(match);
          const d = new Date(matchJson.MatchDay);
          const dstr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
          return (
            <tr>
              <td>
                {matchJson.MatchNumber}
              </td>
              <td>
                {dstr}
              </td>
              <td>
                {matchJson.TeamAName}
              </td>
              <td>
                {matchJson.TeamBName}
              </td>
              <td>
                {matchJson.FirstRefName}
              </td>
              <td>
                {matchJson.SecondRefName}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
};

const PersonalMatchHistory = (props) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get('/api/matchHistory', {
          params: {
            username: props.authenticatedUser,
          }
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setIsLoading(false);
              setMatches(response.data);
            }
          },
          (error) => {
            console.error(error);
          }
        );
    }
  });

  return (
    <div className="page-container">
      <MatchTable matches={matches} />
    </div>
  );
};

/* eslint-enable */

export default PersonalMatchHistory;
