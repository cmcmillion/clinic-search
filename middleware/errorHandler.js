const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "An error occurred" });
};

export default errorHandler;
