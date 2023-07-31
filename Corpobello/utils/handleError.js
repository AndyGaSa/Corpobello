export default function handleError(error, res) {
  res.send(error);
  alert(error.message);
  res.status(500);
}
