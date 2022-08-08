import { Fragment } from 'react';
import { useHistory ,useLocation} from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history=useHistory();
  const location=useLocation();

  const queryParam=new URLSearchParams(location.search);
    const isAscending=queryParam.get('sort')==='asc';

    const myQutes=sortQuotes(props.quotes,isAscending)
  const sortHandler=()=>{
    history.push({
      pathname:location.pathname,
      search:`?sort=${(isAscending?'desc':'asc')}`
    })
//  history.push(`${location.pathname}?sort=${(isAscending?'desc':'asc')}`);
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>sort {isAscending?'descending':'ascending'}</button>
      </div>
      <ul className={classes.list}>
        {myQutes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
