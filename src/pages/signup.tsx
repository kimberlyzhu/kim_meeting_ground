/*users.jsx*/
import React, { useState, useEffect } from "react"; //, { Component, useState }
//You have to use the link component to link between you pages
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
// import { Query, graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import MyCalendar from "./Moment";
import styled from "@emotion/styled";
import "react-big-calendar/lib/css/react-big-calendar.css";

import DatePicker from "react-datepicker";
//yarn add react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface SignUpPagePropsInterface extends RouteComponentProps<{ id: string }> {
  // Other props that belong to component it self not Router
}

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

//const id = this.props.match.params.id  ;//this.props.match.params.id;
type Host = {
  // Mistake #3: The type is wrong here, and that should be caught at compile-time
  email: string;
  firstname: string;
  lastname: string;
};

type Link = {
  link: string;
  duration: number;
  email: string;
};

const urlId: {
  urlid: string;
} = {
  urlid: "",
};

const timeSpan: {
  interval: number;
} = {
  interval: 45,
};

const CalendarCard = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 1000px;
  align-items: center;
  border-radius: 15px;
`;
const temp: any[] = [];
let interval: number;

// let handleChange = (date: any) => {
//   this.setState({
//     startDate: date,
//   });
// };

const SignUpPage: React.FC<SignUpPagePropsInterface> = (
  props: SignUpPagePropsInterface
) => {
  const id = props.match.params.id;
  urlId.urlid = id;

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  //const [interval, setInterval] = useState(45);

  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    let main = startDate;
    console.log(main);
  }

  function IntervalSetup() {
    const { loading, error, data } = useQuery(GET_UNIQUE_LINK, {
      variables: { id: urlId.urlid },
    });

    return loading ? (
      <div>loading</div>
    ) : error ? (
      <div>An Error occurred: {error}</div>
    ) : (
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <DatePicker
            showTimeSelect
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeClassName={handleColor}
            timeFormat="HH:mm"
            timeIntervals={data.link.duration}
            inline
          />
          <div className="form-group">
            <button className="btn btn-primary">Select Date</button>
          </div>
        </form>
      </div>
    );
  }

  //interval = IntervalSetup() > 0 ? IntervalSetup() : 45;

  return (
    <ApolloProvider client={client}>
      <SignUpServer />

      <CalendarCard>
        <IntervalSetup />
      </CalendarCard>
      {/* <CalendarCard>
        <MyCalendar myList={temp} />
      </CalendarCard> */}
    </ApolloProvider>
  );
};

function SignUpServer() {
  const { loading, error, data } = useQuery(GET_UNIQUE_LINK, {
    variables: { id: urlId.urlid },
  });
  return loading ? (
    <div>loading</div>
  ) : error ? (
    <div>An Error occurred: {error}</div>
  ) : (
    <ul>
      <li>
        {data.link.link} used by {data.link.email} for {data.link.duration}
      </li>
    </ul>
  );
}

const GET_UNIQUE_LINK = gql`
  query($id: String) {
    link(id: $id) {
      email
      duration
      link
    }
  }
`;

export default SignUpPage;
