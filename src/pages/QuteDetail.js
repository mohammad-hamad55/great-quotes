import { Fragment,useEffect } from "react";
import { useParams,Route ,Link,useRouteMatch} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuteDetail = () => {
  const {
    sendRequest,
    status,
    error,
    data: loadedQute,
  } = useHttp(getSingleQuote, true);
  const {quteid} = useParams();
  const match = useRouteMatch();

useEffect(()=>{
  sendRequest(quteid);
},[sendRequest,quteid])

if(status==='pending'){
  return (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );
}

if (error) {
  return <p className='centered'>{error}</p>;
}

if (!loadedQute.text) {
  return <p>No quote found!</p>;
}
  return (
    <Fragment>
      <HighlightedQuote
        text={loadedQute.text}
        author={loadedQute.author}
      ></HighlightedQuote>
      {/* <Comments quoteid={quteid}></Comments> */}
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            show comments
          </Link>
        </div>
      </Route> 

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuteDetail;
