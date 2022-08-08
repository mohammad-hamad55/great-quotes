import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";
const NewQute = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  useEffect(() => {
    if (status === "completed") {
      history.push("/qutes");
    }
  }, [status, history]);

  const addQuteHandler = (qute) => {
    sendRequest(qute);
  };
  return (
    <QuoteForm
      isLoading={status === "pending"}
      onAddQuote={addQuteHandler}
    ></QuoteForm>
  );
};

export default NewQute;
