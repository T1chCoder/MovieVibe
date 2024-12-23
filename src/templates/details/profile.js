import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  return <ProfileWrapper id={params.id} />;
};

class ProfileWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.uuid}`)
      .then((res) => {
        this.setState({ user: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>User Profile</h1>
        {user ? (
          <div>
            <h2>ID: {user.id}</h2>
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
          </div>
        ) : (
          <h1>No user found</h1>
        )}
      </div>
    );
  }
}

export default Profile;
