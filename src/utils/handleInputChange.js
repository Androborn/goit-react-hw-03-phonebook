export function handleInputChange({ target: { name, value } }) {
  this.setState({
    [name]: value,
  });
}
