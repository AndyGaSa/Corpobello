export default function handleError(error, res) {
  res.send(error);
  res.status(500);
}
