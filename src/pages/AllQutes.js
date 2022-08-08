import { Fragment, useEffect } from "react";
// import { Route } from "react-router-dom";
// import QuteDetail from "./QuteDetail";
import useHttp from "../hooks/use-http";
import QuoteList from "../components/quotes/QuoteList";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound  from '../components/quotes/NoQuotesFound';

const AllQutes = () => {
  const {
    sendRequest,
    status,
    error,
    data: loadedQutes,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if(error){
    return <p>{error}</p>
  }
if(status==='completed'&&(!loadedQutes||loadedQutes.length===0)){
  return <NoQuotesFound></NoQuotesFound>
}
  return (
    <Fragment>
      <QuoteList quotes={loadedQutes}></QuoteList>
    </Fragment>
  );
};

export default AllQutes;
