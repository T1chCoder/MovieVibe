import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Content = () => {
  const params = useParams();
  return <GenreWrapper uuid={params.uuid} />;
};

class GenreWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/genres/${this.props.uuid}`)
      .then((res) => {
        this.setState({ genre: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { genre, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>{genre.title}</div>
    );
  }
}

export default Content;