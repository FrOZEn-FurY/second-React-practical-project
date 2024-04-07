const notFound = () => {
  return (
    <>
      <div className="container-fluid text-center bg-dark text-white p-2">
        <h1>Page not found.</h1>
        <h4>Check the requested url, and then try again.</h4>
      </div>
    </>
  );
};

export default notFound;
