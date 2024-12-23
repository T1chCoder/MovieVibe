import React from "react";
import axios from "axios";
import ContentListComponent from "../../components/content/list";
import PageComponent from "../../components/page";

const Content = () => {
  return <ContentWrapper />;
};

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/contents/`)
      .then((res) => {
        this.setState({ contents: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { contents, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <main className="wdth-cvr flx-drt-clmn">
        <ContentListComponent contents={contents} />
        <PageComponent />
      </main>
    );
  }
}

export default Content;
