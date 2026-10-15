import Header from "../../components/Header";
import './ErrorPage.css';

function ErrorPage({cart}) {
  return (
    <>
      <Header cart={cart} />
      <div className="errorPage">
        <h1>Page not found.</h1>
      </div>
    </>
  );
}

export default ErrorPage;